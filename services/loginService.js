const { db } = require("../config/db");
const passwordService = require("../services/passwordService");

const loginUser = async (usernameOrEmail, password) => {
  try {
    // Find the user by username or email
    const userQuery = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [usernameOrEmail, usernameOrEmail]
    );

    if (userQuery.rows.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = userQuery.rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await passwordService.comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user; // Return user if password matches
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error("Server error during login");
  }
};

module.exports = { loginUser };
