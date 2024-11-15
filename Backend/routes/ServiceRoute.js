const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService
} = require('../controllers/ServiceControllers');

router.post("/", createService);
router.get("/", getServices);
router.get("/:s_id", getSingleService);
router.patch("/:s_id", updateService);
router.delete("/:s_id", deleteService);

module.exports = router;
