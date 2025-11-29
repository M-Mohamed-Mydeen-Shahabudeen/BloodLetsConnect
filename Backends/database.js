const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'blood_donor.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS donors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    bloodGroup TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    email TEXT,
    city TEXT,
    area TEXT,
    pincode TEXT,
    availabilityStatus TEXT DEFAULT 'Available'
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin' -- 'admin', 'hospital', 'donor'
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS blood_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT NOT NULL,
    bloodGroup TEXT NOT NULL,
    units INTEGER DEFAULT 1,
    hospitalId INTEGER,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Fulfilled'
    requestDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(hospitalId) REFERENCES users(id)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    message TEXT NOT NULL,
    readStatus INTEGER DEFAULT 0, -- 0: unread, 1: read
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);

    // Insert default admin if not exists
    db.get("SELECT * FROM users WHERE username = ?", ['admin'], (err, row) => {
        if (!row) {
            db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['admin', 'admin123', 'admin']);
            console.log("Default admin user created.");
        }
    });

    // Insert default hospital user for testing
    db.get("SELECT * FROM users WHERE username = ?", ['hospital1'], (err, row) => {
        if (!row) {
            db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['hospital1', 'hospital123', 'hospital']);
            console.log("Default hospital user created.");
        }
    });
});

module.exports = db;
