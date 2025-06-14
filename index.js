const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("API working..!"));
app.post("/submit", async (req, res) => {
    const { ip_address, user_agent } = req.body;

    try {
        await db.query(
            `INSERT INTO ip.ip_logs (ip_address, user_agent) VALUES ($1, $2)`,
            [ip_address, user_agent]
        );
        res.json({ message: "IP successfully submitted!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error inserting IP." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
