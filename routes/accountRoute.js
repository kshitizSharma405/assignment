const express = require("express");
const accountController = require("../controllers/accountController");
const { tokenVerification } = require("../middlewares/authMiddleware");
const router = express.Router();

// User Registration Route
router.post("/register", accountController.register);

// User Login Route
router.post("/login", accountController.login);

// GET Register Page
router.get("/register", (req, res) => {
  res.render("register", { error: null, message: null });
});

// GET Login Page
router.get("/login", accountController.loginPage);

module.exports = router;
