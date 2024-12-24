const { Client } = require("pg"); // PostgreSQL client import
const dotenv = require("dotenv"); // Load environment variables from .env file

dotenv.config();

const db = new Client({
  user: process.env.DB_USER, // PostgreSQL username
  host: process.env.DB_HOST, // Host (localhost or remote)
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // PostgreSQL password
  port: process.env.DB_PORT || 5432, // Port (default 5432)
});

const connectDB = async () => {
  try {
    await db.connect(); // Establish connection to the database
    console.log("DB Connected");

    // Create users table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.query(createTableQuery); // Execute query to create table
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("DB Connection Error: ", error);
    process.exit(1); // Exit on failure
  }
};

module.exports = {
  connectDB,
  db, // Export the db client for use elsewhere
};
