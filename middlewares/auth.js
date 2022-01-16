const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, config.JWT_SECRET);
    req.userId = data.id;
    req.role = data.type;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { authorization };
