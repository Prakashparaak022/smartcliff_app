const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/StudentControllers');

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:std_id", getSingleStudent);
router.patch("/:std_id", updateStudent);
router.delete("/:std_id", deleteStudent);

module.exports = router;
