const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const accountRoute = require("./routes/accountRoute");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

connectDB();
app.use("/api/account", accountRoute);
app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
