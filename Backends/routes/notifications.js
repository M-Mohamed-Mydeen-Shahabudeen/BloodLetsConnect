const express = require('express');
const router = express.Router();
const db = require('../database');

// Get notifications for a user
router.get('/:userId', (req, res) => {
    const sql = "SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC";
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Mark notification as read
router.put('/:id/read', (req, res) => {
    const sql = "UPDATE notifications SET readStatus = 1 WHERE id = ?";
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: "marked as read",
            changes: this.changes
        });
    });
});

module.exports = router;
