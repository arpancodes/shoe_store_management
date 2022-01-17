const {
  getLastOrderNo,
  getItemPrice,
  createOrder,
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

module.exports = { createOrderHandler };
