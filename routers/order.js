const express = require("express");
const {
  createOrderHandler,
  makePaymentHandler,
  changeOrderStatusHandler,
} = require("../controllers/order");
const { authorization, isManager } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authorization, createOrderHandler);
router.post("/:orderNo/pay", authorization, makePaymentHandler);
router.put(
  "/:orderNo/status",
  authorization,
  isManager,
  changeOrderStatusHandler
);

module.exports = router;
