const accountService = require("../services/accountService");
const recaptchaService = require("../services/recaptchaService");
const jwt = require("jsonwebtoken");

let accountController = {};

// User Registration
accountController.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.render("register", { error: "All fields are required" });
  }

  if (password.length < 8) {
    return res.render("register", {
      error: "Password must be at least 8 characters",
    });
  }

  try {
    const result = await accountService.registerUser(username, email, password);
    res.render("login", { message: "Registration successful! Please login." });
  } catch (error) {
    console.error(error);
    res.render("register", { error: "Server error" });
  }
};

accountController.login = async (req, res) => {
  const {
    username,
    password,
    "g-recaptcha-response": recaptchaToken,
  } = req.body;
  if (!username || !password || !recaptchaToken) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Verify reCAPTCHA token
  try {
    const isRecaptchaValid = await recaptchaService.verifyRecaptcha(
      recaptchaToken
    );
    if (!isRecaptchaValid) {
      return res
        .status(400)
        .json({ error: "Invalid reCAPTCHA. Please try again." });
    }

    // Authenticate the user
    const user = await accountService.authenticateUser(username, password);
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set the token in cookies
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(200).redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Profile Route (Protected)
accountController.profile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }

      const { id, username, email, created_at } = decoded;
      res.render("profile", { id, username, email, created_at });
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

// Logout Route
accountController.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
// Render Login Page
accountController.loginPage = (req, res) => {
  try {
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.error("Site key not found in environment variables.");
      return res.status(500).send("Server error: Missing reCAPTCHA site key.");
    }
    res.render("login", { siteKey }); // Pass siteKey to the EJS view
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = accountController;
