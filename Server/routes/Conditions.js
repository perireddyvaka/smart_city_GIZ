const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db"); // Import the PostgreSQL client
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM conditions ";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.stack);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { phase, parameter, range_max, range_min, parameter_units } =
      req.body;
    const id = require("uuid").v4();

    // Insert data into the alaram table
    const query =
      "INSERT INTO Conditions (id, phase, parameter,  range_max, range_min, parameter_units) VALUES ($1, $2, $3, $4, $5, $6)";
    await client.query(query, [
      id,
      phase,
      parameter,
      range_max,
      range_min,
      parameter_units,
    ]);

    res.status(200).send({ status: "Data inserted successfully" });
  } catch (err) {
    console.log(err.stack);
  }
});

router.post("/insert", async (req, res) => {
  try {
    const {
      Location,
      time,
      phase,
      dt_voltage,
      pf,
      thd,
      temperature,
      acb_1_current,
      acb_2_current,
      acb_3_current,
      acb_4_current,
      acb_5_current,
      acb_6_current,
      acb_7_current,
      acb_8_current,
      acb_9_current,
      installed_capacity,
    } = req.body;
    const id = require("uuid").v4();

    // Insert data into the alaram table
    const query =
      "INSERT INTO inverted (location, time, phase, dt_voltage, pf, thd, temperature, acb_1_current, acb_2_current, acb_3_current, acb_4_current, acb_5_current, acb_6_current, acb_7_current, acb_8_current, acb_9_current, installed_capacity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)";
    // await client.query(query, [
    //   Location,
    //   time,
    //   phase,
    //   dt_voltage,
    //   pf,
    //   thd,
    //   temperature,
    //   acb_1_current,
    //   acb_2_current,
    //   acb_3_current,
    //   acb_4_current,
    //   acb_5_current,
    //   acb_6_current,
    //   acb_7_current,
    //   acb_8_current,
    //   acb_9_current,
    //   installed_capacity,
    // ]);

    const cquery = "select * from Conditions where phase=$1"
    const respo = await client.query(cquery, [phase]);
    // console.log(respo["rows"])
    for(let i=0;i<respo["rows"].length;i++){
        if (req.body[respo.rows[i].parameter] >= respo.rows[i].range_max || req.body[respo.rows[i].parameter] <= respo.rows[i].range_min){
            const id = require("uuid").v4();
            const checkout = "N/S";
            const Occurrence = "Issue occured by "+ respo.rows[i].parameter;
            const aquery = "INSERT INTO alarm (id, status, location, occurrence, checklog, stage) VALUES ($1, $2, $3, $4, $5, $6)"
            await client.query(aquery, [
                id,
                "Error",
                Location,
                Occurrence,
                checkout,
                "A",
              ]);
        }
    }


    res.status(200).send({ status: "Data inserted successfully" });
  } catch (err) {
    console.log(err.stack);
  }
});



module.exports = router;
