const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await userModel.findById(decoded.payload).select("-password");

      next();
    } catch (error) {
        res.status(401).json({
            msg : "Not authorized, token failed"
        })
    }
  }

  if (!token) {
    res.status(401).json({
        msg : "Not authorized, token failed"
    })
  }
};

module.exports = { protect };
