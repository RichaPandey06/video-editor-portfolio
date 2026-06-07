const protect = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
  subscribe,
  getSubscribers,
} = require("../controllers/subscriberController");

router.post("/", subscribe);
router.get(  "/", protect,getSubscribers);

module.exports = router;