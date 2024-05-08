const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error("token not found");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new Error("Unauthorized");
      }

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
