const express = require("express");
const router = express.Router();
const protect =
  require("../middleware/authMiddleware");
  
const {
  createContact,
  getContacts,
} = require("../controllers/contactController");

router.post("/", createContact);
router.get(
  "/",
  protect,
  getContacts
);

module.exports = router;