const express = require("express");
const router = express.Router();

const {
  createInstitution,
  getInstitutions,
  getSingleInstitution,
  updateInstitution,
  deleteInstitution
} = require('../controllers/InstitueControllers');

router.post("/", createInstitution);
router.get("/", getInstitutions);
router.get("/:coll_id", getSingleInstitution);
router.patch("/:coll_id", updateInstitution);
router.delete("/:coll_id", deleteInstitution);

module.exports = router;
