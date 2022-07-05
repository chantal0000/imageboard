const spicedPg = require("spiced-pg");
const database = "imageboard"; // insert name of database
const username = "postgres";
const password = "postgres";
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);
console.log("[db] connecting to:", database);

module.exports.getImages = () => {
    return db.query(`SELECT * FROM images
    ORDER BY id DESC
    LIMIT 6`);
};

module.exports.uploadImage = (url, username, title, description) => {
    const query = `INSERT INTO images(url, username, title, description) 
VALUES ($1, $2, $3, $4)
RETURNING *`;
    const param = [url, username, title, description];
    return db.query(query, param);
};

module.exports.getImgById = (imgId) => {
    const query = `SELECT * FROM images
    WHERE id = $1`;
    const param = [imgId];
    return db.query(query, param);
};

///

module.exports.getMoreImages = (lowestIdOnScreen) => {
    const q = `SELECT url, title, id, (
  SELECT id FROM images
  ORDER BY id ASC
  LIMIT 1
) AS "lowestId"
FROM images
WHERE id < $1
ORDER BY id DESC
LIMIT 6;`;
    const param = [lowestIdOnScreen];
    return db.query(q, param);
};

module.exports.lowestId = () => {
    return db.query(`SELECT id FROM images
                    ORDER BY id ASC
                    LIMIT 1;`);
};
