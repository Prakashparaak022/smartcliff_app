const CourseModel = require("../models/CourseModel");

const createCourse = (req, res) => {
  const { c_title, c_description, category } = req.body;
  const image_url = req.file ? "public/images/" + req.file.filename : null;

  CourseModel.createCourse({ c_title, c_description, category, image_url }, (err, courseId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ c_id: courseId });
  });
};

const getCourses = (req, res) => {
  CourseModel.getCourses((err, courses) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(courses);
  });
};

const getSingleCourse = (req, res) => {
  const { c_id } = req.params;

  CourseModel.getCourseById(c_id, (err, course) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.status(200).json(course);
  });
};

const updateCourse = (req, res) => {
  const { c_id } = req.params;
  let image_url = req.body.image_url;
  
  if (req.file) {
    image_url = req.file ? "public/images/" + req.file.filename : null;
  }

  const updatedCourseData = {
    c_title: req.body.c_title,
    c_description: req.body.c_description,
    category: req.body.category,
    image_url: image_url,
  };

  CourseModel.updateCourse(c_id, updatedCourseData, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};



const deleteCourse = (req, res) => {
  const { c_id } = req.params;

  CourseModel.deleteCourse(c_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
