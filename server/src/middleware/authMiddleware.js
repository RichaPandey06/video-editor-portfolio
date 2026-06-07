const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.admin = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;