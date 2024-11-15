const connection = require('../config/db');
module.exports = {
  createHireForm: (hireFormData, callback) => {
    const qry = "INSERT INTO HireForms (h_name, h_email, h_phoneNumber, h_companyName, h_hiringEnquiry, h_message, h_designation) VALUES (?, ?, ?, ?, ?, ?, ?);";
    connection.query(qry, [hireFormData.h_name, hireFormData.h_email, hireFormData.h_phoneNumber, hireFormData.h_companyName, hireFormData.h_hiringEnquiry, hireFormData.h_message, hireFormData.h_designation], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  getHireForms: (callback) => {
    const qry = "SELECT * FROM HireForms;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getHireFormById: (id, callback) => {
    const qry = "SELECT * FROM HireForms WHERE h_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  deleteHireForm: (id, callback) => {
    const qry = "DELETE FROM HireForms WHERE h_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};