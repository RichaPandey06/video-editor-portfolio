const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { subscribe, getSubscribers, deleteSubscriber } = require("../controllers/subscriberController");

router.post("/", subscribe);
router.get("/", protect, getSubscribers);
router.delete("/:id", protect, deleteSubscriber);

module.exports = router;