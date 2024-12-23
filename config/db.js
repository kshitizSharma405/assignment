const { Client } = require("pg"); // Correct import for Client
const dotenv = require("dotenv"); // Load environment variables from .env file

dotenv.config();

const db = new Client({
  user: process.env.DB_USER, // Your PostgreSQL username
  host: process.env.DB_HOST, // Host (localhost or remote)
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // PostgreSQL password
  port: process.env.DB_PORT || 5432, // Default is 5432 if not provided
});

const connectDB = async () => {
  try {
    await db.connect();
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

    await db.query(createTableQuery);
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("DB Connection Error: ", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  db, // Export db client for use elsewhere
};
