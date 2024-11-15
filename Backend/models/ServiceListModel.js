const connection = require('../config/db');

module.exports = {
  createService: (serviceData, callback) => {
    const qry = "INSERT INTO servicelists (s_id, service) VALUES (?, ?);";
    connection.query(qry, [serviceData.s_id, serviceData.service], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  getServices: (callback) => {
    const qry = "SELECT * FROM servicelists;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getSingleService: (id, callback) => {
    const qry = "SELECT * FROM servicelists WHERE s_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  updateService: (id, serviceData, callback) => {
    const qry = "UPDATE servicelists SET service = ? WHERE s_id = ?;";
    connection.query(qry, [serviceData.service, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteService: (id, callback) => {
    const qry = "DELETE FROM servicelists WHERE s_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
