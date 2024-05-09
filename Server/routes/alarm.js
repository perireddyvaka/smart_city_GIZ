const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db"); // Import the PostgreSQL client
const router = express.Router();

router.get("/ncount", async (req, res) => {
  try {
    const query = "SELECT count(*) FROM alarm where checklog = $1";
    const value = ["N/S"];
    const { rows } = await client.query(query, value);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

router.get("/acount", async (req, res) => {
  try {
    const query =
      "SELECT count(*) FROM alarm where checklog = $1 and stage = $2";
    const value = ["N/S", "A"];
    const { rows } = await client.query(query, value);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

router.get("/alarmdata", async (req, res) => {
  try {
    const query = "SELECT * FROM alarm where stage='A'";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

router.get("/notidata", async (req, res) => {
  try {
    const query = "SELECT * FROM alarm WHERE stage='N' OR stage = 'A' ";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

router.put("/log/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const query = `
          UPDATE alarm
          SET checklog = $1
          WHERE id = $2
          RETURNING *;
        `;
    const values = ["S", id];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/generated/create", async (req, res) => {
  try {
    const { Status, Location, Occurrence, Stage } = req.body;
    const id = require("uuid").v4();
    const checkout = "N/S";
    // Insert data into the alaram table
    const query =
      "INSERT INTO alarm (id, status, location, occurrence, checklog, stage) VALUES ($1, $2, $3, $4, $5, $6)";
    await client.query(query, [
      id,
      Status,
      Location,
      Occurrence,
      checkout,
      Stage,
    ]);

    res.status(200).send("Data inserted successfully");
  } catch (err) {
    console.log(err.stack);
  }
});

router.put("/renew/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const { status, incharge, remark, occurrence } = req.body;
    const updateOn = new Date().toISOString();
    const stage = "D";

    const query = `
        UPDATE alarm
        SET status = $1, incharge = $2, remarks = $3, timeupdate = $4, stage = $5, occurrence = $6, checklog = $7
        WHERE id = $8
        RETURNING *;
      `;
    const values = [status, incharge, remark, updateOn, stage, occurrence, "S", id];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// New endpoint to move resolved alarm logs to history
router.put("/resolve/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { remark } = req.body;
    const stage = "D"; // 'D' indicates resolved logs moved to history
    const query = `
        UPDATE alarm
        SET stage = $1, remarks = $2
        WHERE id = $3
        RETURNING *;
      `;
    const values = [stage, remark, id];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
