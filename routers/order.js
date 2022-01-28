const express = require("express");
const {
  createOrderHandler,
  makePaymentHandler,
  changeOrderStatusHandler,
  getOrderDetails,
  getCustomerOrderHandler,
} = require("../controllers/order");
const { authorization, isManager } = require("../middlewares/auth");
const router = express.Router();

router
  .post("/", authorization, createOrderHandler)
  .get("/", authorization, getCustomerOrderHandler);
router.post("/:orderNo/pay", authorization, makePaymentHandler);
router.put(
  "/:orderNo/status",
  authorization,
  isManager,
  changeOrderStatusHandler
);
router.get("/:orderNo", authorization, getOrderDetails);

module.exports = router;
