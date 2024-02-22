const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).send("Authorization Token required");

  const token = authorization.split(" ")[1];

  try {
    const data = await jwt.verify(token, process.env.SECRET);
    console.log("creating req user data ", data);
    /* req.user = await User.findById(data._id).select("_id");
    next(); */
    req.user = await User.findById(data._id).select("_id");
    console.log("data req.user", req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Request is not authorized");
  }
};

module.exports = requireAuth;
