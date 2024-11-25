const mysql = require('mysql2');

// Koneksi ke Cloud SQL (MySQL)
const connection = mysql.createConnection({
  host: 'your-db-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'depression-db',
  port: 3306,
});

// Fungsi untuk menyimpan catatan ke Cloud SQL (MySQL)
const saveNoteToDB = async (userId, note) => {
    const timestamp = new Date().toISOString();
    const query = 'INSERT INTO user_notes(user_id, note, timestamp) VALUES(?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId, note, timestamp], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); // Mengembalikan ID dari note yang baru disimpan
            }
        });
    });
};

// Fungsi untuk menyimpan hasil analisis ke Cloud SQL (MySQL)
const saveAnalysisResult = async (userId, result) => {
    const timestamp = new Date().toISOString();
    const query = 'INSERT INTO analysis_results(user_id, result, confidence, timestamp) VALUES(?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId, result, 0.0, timestamp], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); // Mengembalikan ID dari analisis yang baru disimpan
            }
        });
    });
};

// Fungsi untuk mengambil hasil analisis terakhir dari Cloud SQL (MySQL)
const getLatestAnalysisResult = async (userId) => {
    const query = 'SELECT * FROM analysis_results WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results[0]); // Mengembalikan hasil analisis terakhir
            }
        });
    });
};

module.exports = {
    saveNoteToDB,
    saveAnalysisResult,
    getLatestAnalysisResult
};
