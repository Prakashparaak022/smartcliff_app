const connection = require('../config/db');

const ApplicationFormModel = {
  createApplicationForm: (formData, callback) => {
    const qry = "INSERT INTO application_forms (a_name, a_email, a_mobileNumber, a_degree, a_yearOfPassing, a_marksPercentage, a_category) VALUES (?, ?, ?, ?, ?, ?, ?);";
    connection.query(
      qry,
      [
        formData.a_name,
        formData.a_email,
        formData.a_mobileNumber,
        formData.a_degree,
        formData.a_yearOfPassing,
        formData.a_marksPercentage,
        formData.a_category,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        callback(null, result.insertId);
      }
    );
  },

  getApplicationFormById: (formId, callback) => {
    const qry = "SELECT * FROM application_forms WHERE a_form_id = ?;";
    connection.query(qry, [formId], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  getAllApplicationForms: (callback) => {
    const qry = "SELECT * FROM application_forms;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deleteApplicationFormById: (formId, callback) => {
    const qry = "DELETE FROM application_forms WHERE a_form_id = ?;";
    connection.query(qry, [formId], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};

module.exports = ApplicationFormModel;
