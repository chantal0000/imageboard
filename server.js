const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
//////////////////////////////////////////////////
const s3 = require("./s3");
const path = require("path");
//////////////////////////////////////////////////
// const randomFileName = uidSafe(24).then(randomString);
app.use(express.static("./public"));

app.use(express.json());
// added middleware (part2)
app.use(express.urlencoded({ extended: false }));
// we need middleware because we use multipart/form-data in html
// const uploader = multer({ dest: "uploads" });

//////////////////////////////////////////////////
app.get("/images", (req, res) => {
    db.getImages()
        .then((results) => {
            const getImagesResults = results.rows;
            res.json(getImagesResults);
        })
        .catch((err) => {
            console.log("error getImagesResult", err);
        });
});
//////////////////////////////////////////////////
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        //work here, add...
        // create a random file name
        uidSafe(24).then((randomString) => {
            // callback(null, `${randomString}.jpg`);
            callback(null, `${randomString}${path.extname(file.originalname)}`);
        });
        // const extname = ....
        // pick up the filename extention and save it too
    },
});

// uploader = multer({ storage: storage });
const upload = multer({
    storage,
    limits: { fileSize: 2097152 },
});

//////////////////////////////////////////////////
/// UNVOLLSTÄNDIG
app.post("/upload", upload.single("image"), s3.upload, (req, res) => {
    console.log("in upload");
    console.log("req.body:", req.body);
    const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;

    // console.log("this will be containi...........")

    db.uploadImage(url, req.body.user, req.body.title, req.body.description)
        .then((results) => {
            console.log("results.rows", results.rows);
            res.json({
                // tempAnswer: true,
                success: true,
                payload: results.rows,
            });
            //WHAT GOES IN HEERE?
        })
        .catch((err) => {
            console.log("error uploadng", err);
        });
});

//////////////////////////////////////////////////

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
