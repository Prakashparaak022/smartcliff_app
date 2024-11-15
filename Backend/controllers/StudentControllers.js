const StudentModel = require("../models/StudentModel");

const createStudent = (req, res) => {
  const { std_firstName, std_lastName, std_email, std_phone,category } = req.body;
  console.log(res.body);

  StudentModel.createStudent({ std_firstName, std_lastName, std_email, std_phone,category }, (err, studentId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ std_id: studentId });
  });
};

const getStudents = (req, res) => {
  StudentModel.getStudents((err, students) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(students);
  });
};

const getSingleStudent = (req, res) => {
  const { std_id } = req.params;

  StudentModel.getStudentById(std_id, (err, student) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.status(200).json(student);
  });
};

const updateStudent = (req, res) => {
  const { std_id } = req.params;

  StudentModel.updateStudent(std_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteStudent = (req, res) => {
  const { std_id } = req.params;

  StudentModel.deleteStudent(std_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
