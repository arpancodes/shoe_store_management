const express = require("express");
const { createOrderHandler } = require("../controllers/order");
const { authorization } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authorization, createOrderHandler);

module.exports = router;
