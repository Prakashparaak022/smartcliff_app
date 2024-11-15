const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  getSingleEnquiry,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/EnquiryControllers');

router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.get("/:e_id", getSingleEnquiry);
router.patch("/:e_id", updateEnquiry);
router.delete("/:e_id", deleteEnquiry);

module.exports = router;
