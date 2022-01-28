const {
  getLastOrderNo,
  getItemPrice,
  createOrder,
  getOrderById,
  createPayment,
  updateOrders,
  updateOrderNumber,
  getCustomerOrder,
} = require("../utils/queries");
const { nanoid } = require("nanoid");

const createOrderHandler = async (req, res) => {
  const { items } = req.body;
  try {
    const { value: orderNo } = await getLastOrderNo();
    const completeOrder = await Promise.all(
      items.map(async (item) => {
        const { cost } = await getItemPrice(item.id);
        return [orderNo, item.id, req.userId, "ORDERED", item.quantity, cost];
      })
    );
    await createOrder(completeOrder);
    await updateOrderNumber(orderNo + 1);
    return res.json({
      success: true,
      message: "Order created",
      data: { orderNo },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const makePaymentHandler = async (req, res) => {
  const { orderNo } = req.params;
  try {
    const txn_id = nanoid();
    const mode = ["UPI", "NET_BANKING", "CREDIT_CARD", "DEBIT_CARD"][
      Math.floor(Math.random() * 4)
    ];
    const order = await getOrderById(orderNo, req.userId);
    console.log(order);
    if (order.status === "PAYMENT_RECEIVED") {
      return res.json({
        success: true,
        message: "Order already paid",
      });
    }
    const totalAmount = order.reduce((acc, item) => {
      return acc + item.amount * item.quantity;
    }, 0);
    console.log(totalAmount);
    await createPayment(Number(orderNo), mode, totalAmount, "SUCCESS", txn_id);
    res.json({
      success: true,
      message: "Payment successful",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const getOrderDetails = async (req, res) => {
  const { orderNo } = req.params;
  try {
    const order = await getOrderById(orderNo, req.userId);
    return res.json({
      success: true,
      message: "Order details",
      data: order,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const changeOrderStatusHandler = async (req, res) => {
  const { orderNo } = req.params;
  const { status } = req.body;
  try {
    await updateOrders(status, orderNo);
    return res.json({
      success: true,
      message: "Order status changed to " + status,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const getCustomerOrderHandler = async (req, res) => {
  try {
    const order = await getCustomerOrder(req.userId);
    return res.json({
      success: true,
      message: "Customer order",
      data: order,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

module.exports = {
  createOrderHandler,
  makePaymentHandler,
  changeOrderStatusHandler,
  getOrderDetails,
  getCustomerOrderHandler,
};
