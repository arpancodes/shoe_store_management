const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

db.query(
  "CREATE TABLE shop (id int primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, tagline varchar(100), address varchar(255), image varchar(255))",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table shop created`);
    }
  }
);
