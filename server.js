const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const accountRoute = require("./routes/accountRoute");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Set the port to use from the environment or default to 5000

connectDB(); // Connect to the database
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (forms)
app.use(express.json()); // Middleware to parse JSON data

app.use(cookieParser()); // Middleware to parse cookies

app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", path.join(__dirname, "views")); // Set the views directory
app.use(express.static("public")); // Serve static files from the "public" directory

app.use("/api/account", accountRoute); // Routes related to account functionality
app.get("/", (req, res) => {
  res.status(200).render("index", { user: req.user || null, page: "home" }); // Render the home page
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`); // Start the server and log the port
});
