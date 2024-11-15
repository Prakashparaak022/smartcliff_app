const connection = require('../config/db');

module.exports = {
  createApplicationForm: (formData, callback) => {
    const qry = "INSERT INTO ApplicationForms (a_name, a_email, a_mobileNumber, a_degree, a_yearOfPassing, a_marksPercentage, a_category, c_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(qry, [formData.a_name, formData.a_email, formData.a_mobileNumber, formData.a_degree, formData.a_yearOfPassing, formData.a_marksPercentage, formData.a_category, formData.c_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },
  getApplicationForms: (callback) => {
    const qry = "SELECT * FROM ApplicationForms;";
    connection.query(qry, (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getApplicationFormById: (a_form_id, callback) => {
    const qry = "SELECT * FROM ApplicationForms WHERE a_form_id = ?;";
    connection.query(qry, [a_form_id], (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      if (rows.length === 0) {
        return callback(null, null);
      }
      callback(null, rows[0]);
    });
  },

  deleteApplicationForm: (a_form_id, callback) => {
    const qry = "DELETE FROM ApplicationForms WHERE a_form_id = ?;";
    connection.query(qry, [a_form_id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
