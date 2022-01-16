const express = require("express");
require("dotenv").config();
const authRouter = require("./routers/auth");
const shopRouter = require("./routers/shop");
const orderRouter = require("./routers/order");

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL encoded payloads

app.use("/shops", shopRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
