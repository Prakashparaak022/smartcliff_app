const express = require("express");
const router = express.Router();

const {
  createCorporate,
  getCorporates,
  getSingleCorporate,
  updateCorporate,
  deleteCorporate
} = require('../controllers/CorporateControllers');

router.post("/", createCorporate);
router.get("/", getCorporates);
router.get("/:org_id", getSingleCorporate);
router.patch("/:org_id", updateCorporate);
router.delete("/:org_id", deleteCorporate);

module.exports = router;
