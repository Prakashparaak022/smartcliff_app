const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: "course_management",
    connectionLimit: 10
});


// Get method
app.get('/tasks', (req, res) => {
    const query = 'Select * from courses;';

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while adding a course.' });
        } else {
            res.json(result);
        }
    });
});

// POST method
app.post('/tasks', (req, res) => {
    const { name, title, description } = req.body;
    console.log('Request Body:', req.body);
    const query = 'INSERT INTO courses (name, title, description) VALUES (?, ?, ?)';
    const values = [name, title, description];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while adding a course.' });
        } else {
            res.json({ message: 'Course added successfully.' });
        }
    });
});

// PATCH method
app.patch('/tasks/:id', (req, res) => {
    const courseId = req.params.id;
    const { name, title, description } = req.body;
    const query = 'UPDATE courses SET name = ?, title = ?, description = ? WHERE id = ?';
    const values = [name, title, description, courseId];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the course.' });
        } else {
            res.json({ message: 'Course updated successfully.' });
        }
    });
});

// DELETE method
app.delete('/tasks/:id', (req, res) => {
    const courseId = req.params.id;
    const query = 'DELETE FROM courses WHERE id = ?';

    pool.query(query, [courseId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the course.' });
        } else {
            res.json({ message: 'Course deleted successfully.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
