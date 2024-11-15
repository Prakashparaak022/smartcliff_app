const connection = require('../config/db');

module.exports = {
  getServices: (callback) => {
    const qry = "SELECT * FROM services;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getServiceById: (id, callback) => {
    const qry = "SELECT * FROM services WHERE s_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  createService: (service, callback) => {
    const qry = "INSERT INTO services (companyName, s_email, s_phoneNumber, service,requirement) VALUES (?, ?, ?, ?, ?);";
    connection.query(qry, [service.companyName, service.s_email, service.s_phoneNumber, service.service,service.requirement], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  updateService: (id, service, callback) => {
    const qry = "UPDATE services SET companyName = ?, s_email = ?, s_phoneNumber = ?, service = ? , requirement = ? WHERE s_id = ?;";
    connection.query(qry, [service.companyName, service.s_email, service.s_phoneNumber, service.service,service.requirement, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteService: (id, callback) => {
    const qry = "DELETE FROM services WHERE s_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
