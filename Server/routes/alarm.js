const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db"); // Import the PostgreSQL client
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

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
// router.get("/acount", async (req, res) => {
//   try {
//     const query = "SELECT count(*) FROM alarm WHERE checklog = $1 AND stage = $2";
//     const value = ["N/S", "A"];
//     const { rows } = await client.query(query, value);
//     res.status(200).json(rows);
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).send("Server Error");
//   }
// });

// Fetch alarm data with stage 'A'
router.get("/alarmdata", async (req, res) => {
  try {
    const query = "SELECT * FROM alarm WHERE stage = 'A'";
    const { rows } = await client.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log("done");
    res.status(500).send("Server Error");
  }
});

// Fetch alarm data with stage 'A'
router.get("/alarmcloseddata", async (req, res) => {
  try {
    const query = `
      SELECT *,
        ROW_NUMBER() OVER (PARTITION BY occurrence ORDER BY timeupdate) AS occurrence_count
      FROM alarm
      WHERE stage = 'D'
      ORDER BY timeupdate;
    `;
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
    const query = "SELECT * FROM alarm WHERE stage = 'A' OR stage = 'N';";
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
    const { status, Location, stage, ...currentValues } = req.body;
    for (const key in req.body) {
      console.log(`${key}: ${req.body[key]}`);
    }
    const checkout = "N/S";
    let final_occ = ""; 
    let updatedStatus = status; // Create a variable to hold the updated status

    // Generate the list of relevant parameters
    const var_list = Object.keys(currentValues);

    // Convert numeric currentValues to numbers for comparison
    const parsedCurrentValues = {};
    var_list.forEach((key) => {
      const value = parseFloat(currentValues[key]);
      parsedCurrentValues[key] = isNaN(value) ? currentValues[key] : value;
    });

    const get_query = "SELECT * FROM conditions WHERE parameter=$1 LIMIT 1";
    const threshold_list_max = [];
    const threshold_list_min = [];

    for (const parameter of var_list) {
      const values = await client.query(get_query, [parameter]);
      if (values.rows.length > 0) {
        threshold_list_max.push({ [parameter]: values.rows[0].range_max });
        threshold_list_min.push({ [parameter]: values.rows[0].range_min });
      } else {
        threshold_list_max.push({ [parameter]: null });
        threshold_list_min.push({ [parameter]: null });
      }
    }

    // Function to get value from the threshold lists
    const getThresholdValue = (list, key) => {
      const valueObj = list.find((obj) => obj.hasOwnProperty(key));
      return valueObj ? valueObj[key] : null;
    };

    let Outofrange;
    let Notifalg = "";

    console.log("var_list", var_list);
    // Check for each parameter if it exceeds the max threshold value or below the min threshold
    thrslog=""
    for (const parameter of var_list) {
      const currentValue = parsedCurrentValues[parameter];
      const maxValue = getThresholdValue(threshold_list_max, parameter);
      // const minValue = getThresholdValue(threshold_list_min, parameter);
      console.log("::", parameter, currentValue, maxValue);

      if (typeof currentValue === "number") {
        console.log("MaxValue", maxValue, " Current Value", currentValue);
        if (maxValue !== null && currentValue > (maxValue/2)) {
          Notifalg = "N";
          const Noccurrence = `${parameter} `;
          final_occ = Noccurrence ;
          updatedStatus = "Unresolved";
          Outofrange = currentValue;
          await updateAlarm(updatedStatus, final_occ, checkout, "N", req.body.time, `Warning:${Outofrange}`, req.body.Location, req.body.phase);
          console.log("Notification Noted.")
        }
        if (maxValue !== null && currentValue > maxValue) {
          const Aoccurrence = `${parameter} `;
          final_occ = Aoccurrence ;

          // Update the status to "Error" if threshold exceeded
          updatedStatus = "Unresolved";
          Outofrange = currentValue;
          await updateAlarm(updatedStatus, final_occ, checkout, "A", req.body.time, `Outofrange:${Outofrange}`, req.body.Location, req.body.phase);

        }
        // let mmaxValue = maxValue*50/100
        // if(mmaxValue !== null && currentValue > mmaxValue){
        //   Outofrange = currentValue;
        // }
      }
    }

    // Use updatedStatus when calling updateAlarm function
    // if (Notifalg == "N") {
    //   await updateAlarm(updatedStatus, final_occ, checkout, "N", req.body.time, `Warning:${Outofrange}`);
    // }
    // await updateAlarm(updatedStatus, final_occ, checkout, "A", req.body.time, `Outofrange:${Outofrange}`);

    console.log("Max thresholds:", threshold_list_max);
    console.log("Min thresholds:", threshold_list_min);
    res.status(200).send("Data fetched successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

// Function to update data in the alarm table
async function updateAlarm(status, occurrence, checkout, stage, time, Outofrange, Location, phase) {
  console.log(Outofrange);
  try {
    const query = `
    INSERT INTO public.alarm(
	status, occurrence,checklog,stage,timeerror, condition, Location, phase)
	VALUES ($1,$2,$3,$4,$5,$6,$7, $8);
      
    `;
    await client.query(query, [status, occurrence, checkout, stage, time, Outofrange, Location, phase]);
    console.log("Data inserted in alarm table successfully");
  } catch (error) {
    console.error("Error updating data in alarm table:", error);
    throw error;
  }
}


// Insert data into the alaram table
//   const query =
//     "INSERT INTO alarm (id, status, location, occurrence, checklog, stage) VALUES ($1, $2, $3, $4, $5, $6)";
//   await client.query(query, [
//     id,
//     status,
//     location,
//     occurrence,
//     checkout,
//     stage,
//   ]);

//   res.status(200).send("Data inserted successfully");
// return acb_1_current;

router.put("/renew/:id", async (req, res) => {
  try {
    const { occurrence, status, remarks, incharge } = req.body; // Include incharge in request body
    const { id } = req.params;
    const timeupdate = new Date(); // Get the current timestamp

    if (status === "Resolved") {
      // If status is "Resolved", update stage to 'D' and status, remarks, incharge, and timestamp
      const query = "UPDATE alarm SET occurrence = $1, status = $2, remarks = $3, incharge = $4, stage = 'D',checklog = 'S',  timeupdate = $5 WHERE id = $6";
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

router.put("/markAsRead/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE alarm SET checklog = 'S' WHERE id = $1";
    await client.query(query, [id]);
    res.status(200).send("Notification marked as read");
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
