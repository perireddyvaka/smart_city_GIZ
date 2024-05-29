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
    const { status, incharge, remark, occurrence } = req.body;
    const updateOn = new Date().toISOString();
    let stage = "D"; // Default stage for resolved logs
    if (status !== "Resolved") {
      stage = "A"; // If status is not "Resolved", set stage to "A" (Active)
    }

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

    // If status is "Resolved", respond with the updated log data
    if (status === "Resolved") {
      res.status(200).json(result.rows[0]);
    } else {
      // If status is not "Resolved", respond with success message
      res.status(200).json({ message: "Log updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
