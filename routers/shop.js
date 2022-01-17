const express = require("express");
const { getShopsHandler, getShopInfoHandler } = require("../controllers/shop");
const router = express.Router();

router.get("/", getShopsHandler);
router.get("/:id", getShopInfoHandler);

module.exports = router;
