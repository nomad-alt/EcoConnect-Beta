const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  console.log("Inside requireAuth middleware");

  // verify user is authenticated
  const { authorization } = req.headers;

  console.log("Authorization Header:", authorization);

  if (!authorization) {
    console.log("No Authorization header");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  console.log("Token:", token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log("Decoded user ID from JWT:", _id);

    req.user = await User.findOne({ _id }).select("_id");
    console.log("User found from DB:", req.user);

    next();
  } catch (error) {
    console.log("Error in requireAuth middleware:", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
