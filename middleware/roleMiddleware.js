const jwt = require("jsonwebtoken");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).send({ message: "User is not authorized" });
      }
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const { role } = user;
      let hasRole = false;
      if (roles.includes(role)) {
        hasRole = true;
      }
      if (!hasRole) {
        return res.status(403).send({ message: "You have no permition!" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).send({ message: "User is not authorized" });
    }
  };
};
