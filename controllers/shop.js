const {
  getShops,
  getShopById,
  getShoesByShopID,
  getShoeByID,
  getShopOrders,
} = require("../utils/queries");

const getShopsHandler = (req, res) => {
  getShops()
    .then((shops) => {
      res.status(200).json(shops);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getShopInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await getShopById(id);
    const shoes = await getShoesByShopID(id);
    res.status(200).json({
      success: true,
      data: {
        shop,
        shoes,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const getShoeInfoHandler = (req, res) => {
  const { id, shopId } = req.params;
  console.log(id, shopId);
  getShoeByID(id, shopId)
    .then((shoe) => {
      res.status(200).json({
        success: true,
        data: {
          shoe,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
};

const getShopOrdersHandler = async (req, res) => {
  try {
    const orders = await getShopOrders(req.userId);
    res.status(200).json({
      success: true,
      data: {
        orders,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

module.exports = {
  getShopsHandler,
  getShopInfoHandler,
  getShoeInfoHandler,
  getShopOrdersHandler,
};
