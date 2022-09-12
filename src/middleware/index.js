const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../user/userModel");

exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.hashPass = async (req, res, next) => {
  try {
    if (req.body.pass) {
      req.body.pass = await bcrypt.hash(req.body.pass, 8);
      next();
    } else if (req.body.key === "password") {
      req.body.value = await bcrypt.hash(req.body.value, 8);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
