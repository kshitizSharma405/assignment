const bcrypt = require("bcryptjs");
const { db } = require("../config/db");
let accountService = {};

// User Registration Service
accountService.registerUser = async (username, email, password) => {
  try {
    // Check if email or username already exists
    const checkUserQuery = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (checkUserQuery.rows.length > 0) {
      throw new Error("Email or Username already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert new user into the database
    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

// User Authentication Service
accountService.authenticateUser = async (username, password) => {
  try {
    // Find the user by username or email
    const userQuery = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [username, username]
    );
    if (userQuery.rows.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = userQuery.rows[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    return user; // Return user if password matches
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

module.exports = accountService;
