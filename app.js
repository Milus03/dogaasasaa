const express = require("express");
const dataRouter = require("./routers/data");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/data", dataRouter);

app.get("/", (req, res) => {
    res.json({ message: "Működik a szerver!" });
});

app.use((err, req, res, next) => {
    console.error(err.message, err.stack);
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`A szerver fut: http://localhost:${PORT}`);
});
