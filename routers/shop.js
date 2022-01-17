const express = require("express");
const {
  getShopsHandler,
  getShopInfoHandler,
  getShoeInfoHandler,
  getShopOrdersHandler,
} = require("../controllers/shop");
const { makeManager } = require("../controllers/auth");
const router = express.Router();
const { authorization, isManager } = require("../middlewares/auth");

router.get("/", getShopsHandler);
router.get("/:shopId/shoes/:id", getShoeInfoHandler);
router.get("/:id", getShopInfoHandler);
router.get("/:shopId/make-manager/:userId", makeManager);
router.get("/:id/orders", authorization, isManager, getShopOrdersHandler);

module.exports = router;
