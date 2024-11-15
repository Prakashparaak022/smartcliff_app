
const connection = require('../config/db');

const UserModel = {
  createUser: (userData, callback) => {
    const qry = "INSERT INTO users (u_username, u_password, u_email) VALUES (?, ?, ?);";
    connection.query(
      qry,
      [userData.u_username, userData.u_password, userData.u_email],
      (err, result) => {
        if (err) {
          console.error(err);
          return callback(err, null);
        }
        callback(null, result.insertId);
      }
    );
  },

  getUserById: (userId, callback) => {
    const qry = "SELECT * FROM users WHERE u_id = ?;";
    connection.query(qry, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  getAllUsers: (callback) => {
    const qry = "SELECT * FROM users;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deleteUserById: (userId, callback) => {
    const qry = "DELETE FROM users WHERE u_id = ?;";
    connection.query(qry, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  
  updateUserPasswordById: (userId, newPassword, callback) => {
    const qry = "UPDATE users SET u_password = ? WHERE u_id = ?;";
    connection.query(qry, [newPassword, userId], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
  
};

module.exports = UserModel;