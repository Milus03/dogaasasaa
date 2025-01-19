const mysql = require("mysql2/promise");
const { config } = require("./config");

const db = mysql.createPool(config.db);

db.getConnection()
    .then(() => console.log("Sikeres kapcsolódás az adatbázishoz."))
    .catch((err) => {
        console.error("Hiba az adatbázis kapcsolatnál:", err);
        process.exit(1);
    });

module.exports = db;
