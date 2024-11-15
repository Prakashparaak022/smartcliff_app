const connection = require('../config/db');

module.exports = {
  getCategories: (callback) => {
    const qry = "SELECT * FROM categories;";
    connection.query(qry, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getCategoryById: (id, callback) => {
    const qry = "SELECT * FROM categories WHERE category_id = ?;";
    connection.query(qry, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  createCategory: (categoryData, callback) => {
    const qry = "INSERT INTO categories (category) VALUES (?);";
    connection.query(qry, [categoryData.category], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  updateCategory: (id, categoryData, callback) => {
    const qry = "UPDATE categories SET category = ? WHERE category_id = ?;";
    connection.query(qry, [categoryData.category, id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteCategory: (id, callback) => {
    const qry = "DELETE FROM categories WHERE category_id = ?;";
    connection.query(qry, [id], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    });
  },
};
