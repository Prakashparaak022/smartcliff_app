const connection = require("../config/db");

module.exports = {
  createCorporate: (corporateData, callback) => {
    const qry =
      "INSERT INTO CorporateDetails (orgName, orgEmail, orgPhone,service) VALUES (?, ?, ?,?);";
    connection.query(
      qry,
      [
        corporateData.orgName,
        corporateData.orgEmail,
        corporateData.orgPhone,
        corporateData.service,
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

  getCorporates: (callback) => {
    const qry = "SELECT * FROM CorporateDetails;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getCorporateById: (id, callback) => {
    const qry = "SELECT * FROM CorporateDetails WHERE org_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  updateCorporate: (id, corporateData, callback) => {
    const qry =
      "UPDATE CorporateDetails SET orgName = ?, orgEmail = ?, orgPhone = ? , service = ? WHERE org_id = ?;";
    connection.query(
      qry,
      [
        corporateData.orgName,
        corporateData.orgEmail,
        corporateData.orgPhone,
        corporateData.service,
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

  deleteCorporate: (id, callback) => {
    const qry = "DELETE FROM CorporateDetails WHERE org_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
