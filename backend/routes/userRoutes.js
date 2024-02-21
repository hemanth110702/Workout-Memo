const express = require("express");
const { login, signup } = require("../controller/userController");

const router = express.Router();

router.use(express.json());
router.get("/login", login);

router.get("/signup", signup);

module.exports = router;
