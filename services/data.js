const db = require("../config/db");

async function getDatas() {
    const [rows] = await db.promise().query("SELECT * FROM `sql`"); 
    return rows.length ? rows : []; 
}

async function getDataById(id) {
    const [rows] = await db.promise().query("SELECT * FROM backdoga WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
}

module.exports = { getDatas, getDataById };