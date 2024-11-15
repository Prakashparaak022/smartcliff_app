const connection = require('../config/db');
// const CourseModel = require("../models");

module.exports = {
  getCourses: (callback) => {
    const qry = "SELECT * FROM courses;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getCourseById: (id, callback) => {
    const qry = "SELECT * FROM courses WHERE c_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  createCourse: (courseData, callback) => {
    const qry = "INSERT INTO courses (c_title, c_description, category, image_url) VALUES (?, ?, ?, ?);";
    connection.query(qry, [courseData.c_title, courseData.c_description, courseData.category, courseData.image_url], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  updateCourse: (id, courseData, callback) => {
    const qry = "UPDATE courses SET c_title = ?, c_description = ?, category = ?, image_url = ? WHERE c_id = ?;";
    connection.query(qry, [courseData.c_title, courseData.c_description, courseData.category, courseData.image_url, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteCourse: (id, callback) => {
    const qry = "DELETE FROM courses WHERE c_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
