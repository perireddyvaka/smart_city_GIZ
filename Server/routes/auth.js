const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db"); // Import the PostgreSQL client
const router = express.Router();

const JWT_SECRET = "SMART"

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM user_management"
    const ress = await client.query(query);
    res.send(ress)
  } catch (err) {
    console.log(err.stack);
  } 
});

// Route for user signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, role, phone, password } = req.body;
    // console.log(req.body)
    // Check if the email already exists
    const emailCheckQuery = "SELECT * FROM user_management WHERE email = $1";
    const emailCheckResult = await client.query(emailCheckQuery, [email]);
    // console.log(emailCheckResult);
    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "A user with this email already exists",
      });
    }
    const id = require("uuid").v4();
    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO user_management(userid, username, email, role, phone, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [id, username, email, role, phone, password];
    const insertedUser = await client.query(insertQuery, values);

    // Generate JWT token
    const data = {
      user: {
        id: insertedUser.rows[0].userid, // Assuming userid is auto-generated
        role: insertedUser.rows[0].role,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// login router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Query the database to find the user
    const userQuery = {
      text: 'SELECT * FROM user_management WHERE email = $1',
      values: [email]
    };
    const userResult = await client.query(userQuery);
    console.log(userResult)
    const user = userResult.rows[0];

    // Check if user exists
    if (!user) {
      return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
    }

    // Compare passwords (assuming passwords are stored as plaintext for this example, which is not recommended)
    if (password !== user.password) {
      return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
    }

    // Prepare JWT token
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
