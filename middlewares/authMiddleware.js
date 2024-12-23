const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");

function tokenVerification(req, res, next) {
  let token = req.header("Authorization");
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
        return res
          .status(401)
          .send(utils.createResult("Invalid token", null, err.message));
      }
      req.user = decoded;
      next();
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
