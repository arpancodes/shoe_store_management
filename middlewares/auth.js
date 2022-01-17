const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    req.userId = data.userId;
    req.role = data.type;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

const isManager = (req, res, next) => {
  if (req.role === "manager") {
    return next();
  }
  return res.sendStatus(403);
};

module.exports = { authorization, isManager };
