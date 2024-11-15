const connection = require('../config/db'); // Import your database connection

module.exports = {
  createStudent: (studentData, callback) => {
    const qry = "INSERT INTO StudentDetails (std_firstName, std_lastName, std_email, std_phone,category) VALUES (?, ?, ?,?, ?);";
    connection.query(qry, [studentData.std_firstName, studentData.std_lastName, studentData.std_email, studentData.std_phone,studentData.category], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  getStudents: (callback) => {
    const qry = "SELECT * FROM StudentDetails;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getStudentById: (id, callback) => {
    const qry = "SELECT * FROM StudentDetails WHERE std_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  updateStudent: (id, studentData, callback) => {
    const qry = "UPDATE StudentDetails SET std_firstName = ?, std_lastName = ?, std_email = ?, std_phone=?,category = ? WHERE std_id = ?;";
    connection.query(qry, [studentData.std_firstName, studentData.std_lastName, studentData.std_email, studentData.std_phone,studentData.category, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteStudent: (id, callback) => {
    const qry = "DELETE FROM StudentDetails WHERE std_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
