const rateLimit = require("express-rate-limit");

// Define a rate limit rule (for example, max 5 requests per 10 minutes)
const loginRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per `windowMs`
  message:
    "Too many login attempts from this IP, please try again after 1 minutes.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = loginRateLimiter;
