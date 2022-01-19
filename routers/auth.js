const express = require("express");
const router = express.Router();
const { login, register, logout, getUser } = require("../controllers/auth");
const { authorization } = require("../middlewares/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/user", authorization, getUser);

module.exports = router;
