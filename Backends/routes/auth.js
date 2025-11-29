const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // In a real app, use bcrypt to compare hashed passwords
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.get(sql, [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({
                message: "success",
                user: { id: row.id, username: row.username, role: row.role }
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

module.exports = router;
