const express = require("express");
const { login, signup } = require("../controller/userController");

const router = express.Router();

router.use(express.json());
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
