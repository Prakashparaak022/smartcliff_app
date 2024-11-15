const connection = require('../config/db');

const ContactModel = {
  createContact: (contactData, callback) => {
    const qry = "INSERT INTO Contacts (contact_name, contact_email, contact_phoneNumber, contact_message) VALUES (?, ?, ?, ?);";
    connection.query(
      qry,
      [contactData.contact_name, contactData.contact_email, contactData.contact_phoneNumber, contactData.contact_message],
      (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        callback(null, result.insertId);
      }
    );
  },

  getContacts: (callback) => {
    const qry = "SELECT * FROM Contacts;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getContactById: (id, callback) => {
    const qry = "SELECT * FROM Contacts WHERE contact_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  updateContact: (id, contactData, callback) => {
    const qry = "UPDATE Contacts SET contact_name = ?, contact_email = ?, contact_phoneNumber = ?, contact_message = ? WHERE contact_id = ?;";
    connection.query(
      qry,
      [contactData.contact_name, contactData.contact_email, contactData.contact_phoneNumber, contactData.contact_message, id],
      (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        callback(null, result.affectedRows);
      }
    );
  },

  deleteContact: (id, callback) => {
    const qry = "DELETE FROM Contacts WHERE contact_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};

module.exports = ContactModel;
