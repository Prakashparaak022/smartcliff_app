const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/CourseControllers');

const imageStorage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({ storage: imageStorage });

router.post("/", imageUpload.single("image"), createCourse);
router.get("/", getCourses);

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../public/images', filename);
  res.sendFile(filePath);
});
router.patch("/:c_id", imageUpload.single("image"), updateCourse);
router.get("/:c_id", getSingleCourse);
router.delete("/:c_id", deleteCourse);

module.exports = router;
