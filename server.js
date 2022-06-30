const express = require("express");
const app = express();

app.use(express.static("./public"));

app.use(express.json());
// added middleware (part2)
app.use(express.urlencoded({ extended: false }));
const db = require("./db");
app.get("/images", (req, res) => {
    db.getImages().then((results) => {
        const getImagesResults = results.rows;
        res.json(getImagesResults);
    });
});

app.post("/upload", (req, res) => {
    console.log("in upload");
    console.log("req.body", req.body);
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
