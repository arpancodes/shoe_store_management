const jwt = require("jsonwebtoken");
const {
  comparePassword,
  insertIntoUserQuery,
  getUserByEmail,
  createManager,
} = require("../utils/queries");

const register = async (req, res) => {
  const { fname, lname, email, gender, address, phone, password } = req.body;
  try {
    await insertIntoUserQuery(
      fname,
      lname,
      email,
      gender,
      address,
      phone,
      "customer",
      password
    );
    res.json({ success: true, message: "User Created" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "User can't be registered, Please try again.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    const isMatch = await comparePassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { userId: user.id, email: user.email, type: user.type },
        process.env.JWT_SECRET
      );
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json({ success: true, message: "Logged in", data: user });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const makeManager = async (req, res) => {
  const { userId, shopId } = req.params;
  try {
    await createManager(userId, shopId);
    return res.json({ success: true, message: "User made manager" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e });
  }
};

const getUser = async (req, res) => {
  const { email } = req;
  const user = await getUserByEmail(email);
  return res.json({ success: true, data: user });
};

module.exports = { register, login, logout, makeManager, getUser };
