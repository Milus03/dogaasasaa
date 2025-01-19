const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res, next) => {
    try {
        const [rows] = await db.query("SELECT * FROM `sql`");
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM `sql` WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Nem található az elem." });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    const { name, cuisine, ingredients, instructions, image_url } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO `sql` (name, cuisine, ingredients, instructions, image_url) VALUES (?, ?, ?, ?, ?)",
            [name, cuisine, ingredients, instructions, image_url]
        );
        res.json({ message: result.affectedRows ? "Sikeres hozzáadás" : "Nem sikerült hozzáadni." });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name, cuisine, ingredients, instructions, image_url } = req.body;
    try {
        const [result] = await db.query(
            "UPDATE `sql` SET name = ?, cuisine = ?, ingredients = ?, instructions = ?, image_url = ? WHERE id = ?",
            [name, cuisine, ingredients, instructions, image_url, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nem található az elem." });
        }
        res.json({ message: "Sikeres frissítés." });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM `sql` WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nem található az elem." });
        }
        res.json({ message: "Sikeres törlés." });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
