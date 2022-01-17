const express = require("express");
const {
  getShopsHandler,
  getShopInfoHandler,
  getShoeInfoHandler,
} = require("../controllers/shop");
const router = express.Router();

router.get("/", getShopsHandler);
router.get("/:shopId/shoes/:id", getShoeInfoHandler);
router.get("/:id", getShopInfoHandler);

module.exports = router;
