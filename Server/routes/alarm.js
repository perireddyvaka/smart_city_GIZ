const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db"); // Import the PostgreSQL client
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Fetch alarm count with specific checklog
router.get("/ncount", async (req, res) => {
  try {
    const query = "SELECT count(*) FROM alarm WHERE checklog = $1";
    const value = ["N/S"];
    const { rows } = await client.query(query, value);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Server Error");
  }
});

// Fetch alarm count with specific checklog and stage
router.get("/acount", async (req, res) => {
  try {
    const query = "SELECT count(*) FROM alarm WHERE checklog = $1 AND stage = $2";
    const value = ["N/S", "A"];
    const { rows } = await client.query(query, value);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Server Error");
  }
});

// Fetch alarm data with stage 'A'
router.get("/alarmdata", async (req, res) => {
  try {
    const query = "SELECT * FROM alarm WHERE stage = 'A'";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Server Error");
  }
});

// Fetch alarm data with stage 'N' or 'A'
router.get("/notidata", async (req, res) => {
  try {
    const query = "SELECT * FROM alarm WHERE stage = 'N' OR stage = 'A'";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Server Error");
  }
});

// Create a new alarm entry
router.post("/generated/create", async (req, res) => {
  try {
    const { Status, Location, Occurrence, Stage } = req.body;
    const id = uuidv4();
    const checkout = "N/S";
    const query = "INSERT INTO alarm (id, status, location, occurrence, checklog, stage) VALUES ($1, $2, $3, $4, $5, $6)";
    await client.query(query, [id, Status, Location, Occurrence, checkout, Stage]);
    res.status(200).send("Data inserted successfully");
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Server Error");
  }
});

router.put("/renew/:id", async (req, res) => {
  try {
    const { occurrence, status, remarks, incharge } = req.body; // Include incharge in request body
    const { id } = req.params;
    const timeupdate = new Date(); // Get the current timestamp

    if (status === "Resolved") {
      // If status is "Resolved", update stage to 'D' and status, remarks, incharge, and timestamp
      const query = "UPDATE alarm SET occurrence = $1, status = $2, remarks = $3, incharge = $4, stage = 'D', timeupdate = $5 WHERE id = $6";
      await client.query(query, [occurrence, status, remarks, incharge, timeupdate, id]);
    } else {
      // If status is not "Resolved", update only status, remarks, incharge, and timestamp
      const query = "UPDATE alarm SET occurrence = $1, status = $2, remarks = $3, incharge = $4, timeupdate = $5 WHERE id = $6";
      await client.query(query, [occurrence, status, remarks, incharge, timeupdate, id]);
    }

    res.status(200).send("Data updated successfully");
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
