const accountService = require("../services/accountService");
const recaptchaService = require("../services/recaptchaService");
const jwt = require("jsonwebtoken");

let accountController = {};

// User Registration
accountController.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.render("register", {
      error: "All fields are required",
      user: req.user || null,
      page: "register",
    });
  }

  if (password.length < 8) {
    return res.render("register", {
      error: "Password must be at least 8 characters",
      user: req.user || null,
      page: "register",
    });
  }

  try {
    await accountService.registerUser(username, email, password);
    res.status(200).redirect("login");
  } catch (error) {
    console.error(error);
    res.render("register", {
      error: "Error during registration. Please try again.",
      page: "register",
    });
  }
};

// User Login
accountController.login = async (req, res) => {
  const {
    username,
    password,
    "g-recaptcha-response": recaptchaToken,
  } = req.body;

  // Validation
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

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set the token in cookies
    res.cookie("token", token, { httpOnly: true, secure: false });
    console.log("token in cookie", token);

    // Redirect to the profile page
    res.status(200).redirect("/api/account/profile");
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", {
      error: "Error during login. Please try again.",
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      page: "login",
    });
  }
};

// Profile Route (Protected)
accountController.profile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/api/account/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect("/api/account/login");
      }

      const { id, username, email } = decoded;
      res.render("profile", {
        id,
        username,
        email,
        user: req.user || null,
        page: "profile",
      });
    });
  } catch (error) {
    console.error("Profile Route Error:", error.message);
    res.redirect("/api/account/login");
  }
};

// Logout Route
accountController.logout = (req, res) => {
  // Clear the cookie on logout
  res.clearCookie("token");
  res.redirect("/api/account/login");
};

// Render Login Page (with reCAPTCHA site key)
accountController.loginPage = (req, res) => {
  try {
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      return res.status(500).send("Server error: Missing reCAPTCHA site key.");
    }
    res.render("login", {
      siteKey,
      error: null,
      user: req.user || null,
      page: "login",
    });
  } catch (error) {
    console.error("Error rendering login page:", error);
    res.status(500).send("Server error");
  }
};

module.exports = accountController;
