const {
  getLastOrderNo,
  getItemPrice,
  createOrder,
  getOrderById,
  createPayment,
  updateOrders,
} = require("../utils/queries");

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
    return res.json({
      success: true,
      message: "Order created",
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
  const { mode, txn_id } = req.body;
  try {
    const order = await getOrderById(orderNo);
    console.log(order);
    if (order.status === "PAID") {
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

module.exports = {
  createOrderHandler,
  makePaymentHandler,
  changeOrderStatusHandler,
};
