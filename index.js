const express = require("express");
require("dotenv").config();
const authRouter = require("./routers/auth");
const shopRouter = require("./routers/shop");
const orderRouter = require("./routers/order");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL encoded payloads

app.use("/shops", shopRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
