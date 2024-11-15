const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: "course_management",
    connectionLimit: 10
});

pool.query(`select * from courses`, (err, results, fields) => {
    if (err) {
        return console.error(err);
    }
    console.log(results);
});
