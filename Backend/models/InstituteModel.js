const connection = require("../config/db");

module.exports = {
  createInstitution: (institutionData, callback) => {
    const qry =
      "INSERT INTO InstitutionDetails (collegeName, collegeEmail, collegePhone, service) VALUES (?, ?, ?, ?);";
    connection.query(
      qry,
      [
        institutionData.collegeName,
        institutionData.collegeEmail,
        institutionData.collegePhone,
        institutionData.service,
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

  getInstitutions: (callback) => {
    const qry = "SELECT * FROM InstitutionDetails;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getInstitutionById: (id, callback) => {
    const qry = "SELECT * FROM InstitutionDetails WHERE coll_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  updateInstitution: (id, institutionData, callback) => {
    const qry =
      "UPDATE InstitutionDetails SET collegeName = ?, collegeEmail = ?, collegePhone = ? service = ? WHERE coll_id = ?;";
    connection.query(
      qry,
      [
        institutionData.collegeName,
        institutionData.collegeEmail,
        institutionData.collegePhone,
        institutionData.service,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        callback(null, result.affectedRows);
      }
    );
  },

  deleteInstitution: (id, callback) => {
    const qry = "DELETE FROM InstitutionDetails WHERE coll_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
