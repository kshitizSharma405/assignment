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
  res.render("register", {
    error: null,
    message: null,
    user: req.user || null,
    page: "register",
  });
});

// GET Login Page
router.get("/login", accountController.loginPage);

// Profile Route (Protected)
router.get("/profile", tokenVerification, accountController.profile);

// Logout Route
router.get("/logout", accountController.logout);

module.exports = router;
