const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all donors with optional filters
router.get('/', (req, res) => {
    const { bloodGroup, city, availabilityStatus } = req.query;
    let sql = "SELECT * FROM donors WHERE 1=1";
    const params = [];

    if (bloodGroup) {
        sql += " AND bloodGroup = ?";
        params.push(bloodGroup);
    }
    if (city) {
        sql += " AND city LIKE ?";
        params.push(`%${city}%`);
    }
    if (availabilityStatus) {
        sql += " AND availabilityStatus = ?";
        params.push(availabilityStatus);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Add a new donor
router.post('/', (req, res) => {
    const { fullName, age, gender, bloodGroup, phoneNumber, email, city, area, pincode, availabilityStatus } = req.body;
    const sql = `INSERT INTO donors (fullName, age, gender, bloodGroup, phoneNumber, email, city, area, pincode, availabilityStatus) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const params = [fullName, age, gender, bloodGroup, phoneNumber, email, city, area, pincode, availabilityStatus || 'Available'];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: { id: this.lastID, ...req.body }
        });
    });
});

// Update a donor
router.put('/:id', (req, res) => {
    const { fullName, age, gender, bloodGroup, phoneNumber, email, city, area, pincode, availabilityStatus } = req.body;
    const sql = `UPDATE donors SET fullName = ?, age = ?, gender = ?, bloodGroup = ?, phoneNumber = ?, email = ?, city = ?, area = ?, pincode = ?, availabilityStatus = ? WHERE id = ?`;
    const params = [fullName, age, gender, bloodGroup, phoneNumber, email, city, area, pincode, availabilityStatus, req.params.id];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            changes: this.changes
        });
    });
});

// Delete a donor
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM donors WHERE id = ?';
    db.run(sql, req.params.id, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

module.exports = router;
