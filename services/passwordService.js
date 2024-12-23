const bcrypt = require("bcrypt");
const saltRounds = 10;

// Service object to hold the functions
let service = {};

// Hash the password
service.passwordHash = async (password) => {
  try {
    if (!password) {
      throw new Error("Password is required for hashing");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
};

// Compare the password with the hash
service.comparePassword = async (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
      throw new Error(
        "Both password and hashed password are required for comparison"
      );
    }
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Password comparison failed");
  }
};

module.exports = service;
