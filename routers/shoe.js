const express = require("express");
const { getShoesHandler } = require("../controllers/shoe");
const router = express.Router();

router.get("/", getShoesHandler);

module.exports = router;
