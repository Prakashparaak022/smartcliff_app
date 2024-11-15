const connection = require('../config/db');

module.exports = {
  getEnquiries: (callback) => {
    const qry = "SELECT * FROM enquiries;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getEnquiryById: (id, callback) => {
    const qry = "SELECT * FROM enquiries WHERE e_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  createEnquiry: (enquiryData, callback) => {
    const qry = "INSERT INTO enquiries (e_name, e_email, e_phone_number, e_message, c_id,category) VALUES (?, ?, ?, ?, ?,?);";
    connection.query(qry, [enquiryData.e_name, enquiryData.e_email, enquiryData.e_phone_number, enquiryData.e_message, enquiryData.c_id,enquiryData.category], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  updateEnquiry: (id, enquiryData, callback) => {
    const qry = "UPDATE enquiries SET e_name = ?, e_email = ?, e_phone_number = ?, e_message = ?, c_id = ? , category = ? WHERE e_id = ?;";
    connection.query(qry, [enquiryData.e_name, enquiryData.e_email, enquiryData.e_phone_number, enquiryData.e_message, enquiryData.c_id,,enquiryData.category, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteEnquiry: (id, callback) => {
    const qry = "DELETE FROM enquiries WHERE e_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
