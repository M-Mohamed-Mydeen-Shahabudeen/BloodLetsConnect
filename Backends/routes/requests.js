const express = require('express');
const router = express.Router();
const db = require('../database');

// Create a blood request
router.post('/', (req, res) => {
    const { patientName, bloodGroup, units, hospitalId } = req.body;

    if (!patientName || !bloodGroup || !hospitalId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `INSERT INTO blood_requests (patientName, bloodGroup, units, hospitalId) VALUES (?, ?, ?, ?)`;

    db.run(sql, [patientName, bloodGroup, units, hospitalId], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const requestId = this.lastID;

        // Trigger notifications for matching donors (Simulated by notifying all donors for now, or just logging)
        // In a real app, we would query donors with matching blood group and create notifications for them if they were users.
        // Since donors are just records, we can't notify them in-app unless they have user accounts.
        // But we can create notifications for other hospitals or admins.

        // Let's just return success.
        res.json({
            message: "Request created successfully",
            id: requestId
        });
    });
});

// Get all requests (can filter by hospitalId or status)
router.get('/', (req, res) => {
    const { hospitalId, status } = req.query;
    let sql = "SELECT * FROM blood_requests WHERE 1=1";
    const params = [];

    if (hospitalId) {
        sql += " AND hospitalId = ?";
        params.push(hospitalId);
    }
    if (status) {
        sql += " AND status = ?";
        params.push(status);
    }

    sql += " ORDER BY requestDate DESC";

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Update request status
router.put('/:id', (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE blood_requests SET status = ? WHERE id = ?";

    db.run(sql, [status, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: "updated",
            changes: this.changes
        });
    });
});

module.exports = router;
