const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

db.query(
  "CREATE TABLE if not exists shop (id int primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, tagline varchar(100), address varchar(255), image varchar(255))",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table shop created`);
    }
  }
);

db.query(
  "create table if not exists shoe (id int primary key, brand varchar(50) NOT NULL, size int NOT NULL, color varchar(40) NOT NULL, cost int NOT NULL, description varchar(80) , shop_id int, foreign key(shop_id) references shop(id) on delete cascade on update cascade)",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table shoe created`);
    }
  }
);
