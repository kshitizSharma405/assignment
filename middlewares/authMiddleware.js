const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");

// Middleware for token verification
function tokenVerification(req, res, next) {
  let token = req.cookies.token || req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .send(
        utils.createResult("Token is required", null, "User is not logged in")
      );
  }

  token = token.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
      if (err) {
        console.log(err.message);
        return res.redirect("/api/account/login");
      }
      req.user = decoded; // Attach decoded user data to the request
      next(); // Continue to the next middleware/route
    });
  } catch (err) {
    return res
      .status(400)
      .send(utils.createResult(err.message, null, "Something went wrong"));
  }
}

module.exports = {
  tokenVerification,
};
