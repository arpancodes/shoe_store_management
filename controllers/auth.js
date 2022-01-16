const jwt = require("jsonwebtoken");
const {
  comparePassword,
  insertIntoUserQuery,
  getUserByEmail,
} = require("../utils/queries");

const register = async (req, res) => {
  const { fname, lname, email, gender, address, phone, type, password } =
    req.body;
  try {
    await insertIntoUserQuery(
      fname,
      lname,
      email,
      gender,
      address,
      phone,
      type,
      password
    );
    res.json({ success: true, message: "User Created" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "Couldn't insert" });
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
        .json({ success: true, message: "Logged in" });
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

module.exports = { register, login, logout };
