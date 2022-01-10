const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

db.query(
  "CREATE TABLE if not exists Shop (id int primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, tagline varchar(100), address varchar(255), image varchar(255))",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table Shop created`);
    }
  }
);

db.query(
  "create table if not exists Shoe (id int primary key, brand varchar(50) NOT NULL, size int NOT NULL, color varchar(40) NOT NULL, cost int NOT NULL, description varchar(80) , shop_id int, foreign key(shop_id) references shop(id) on delete cascade on update cascade)",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table Shoe created`);
    }
  }
);

db.query(
  "CREATE TABLE if not exists User (id int primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, email varchar(100) NOT NULL, gender char(1) NOT NULL, address varchar(55) NOT NULL, phone varchar(10) NOT NULL, type varchar(20) NOT NULL)",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table User created`);
    }
  }
);

db.query(
  "CREATE TABLE if not exists Manager (id int primary key, shop_id int, foreign key(shop_id) references shop(id), user_id int, foreign key(user_id) references user(id))",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table Manager created`);
    }
  }
);

db.query(
  "CREATE TABLE if not exists Orders (order_id int, shoe_id int, foreign key(shoe_id) references shoe(id) on delete cascade on update cascade, cus_id int, foreign key(cus_id) references user(id) on delete cascade on update cascade, shop varchar(50) NOT NULL, status varchar(50) NOT NULL, primary key(order_id, shoe_id))",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table Orders created`);
    }
  }
);

db.query(
  "CREATE TABLE if not exists Payment (id int, ord_id int, foreign key(ord_id) references Orders(order_id) on delete cascade on update cascade, user_id int, foreign key(user_id) references user(id) on delete cascade on update cascade, mode varchar(50) NOT NULL, time datetime NOT NULL, amount int NOT NULL)",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Table Payment created`);
    }
  }
);

db.query(
  `INSERT into Shop values(1,"Air","Jordan","the smoothest of all","bangalore, marathalli","")`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Values inserted in Shop`);
    }
  }
);


