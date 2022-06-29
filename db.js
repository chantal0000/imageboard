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
    return db.query(`SELECT * FROM images`);
};
