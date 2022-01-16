const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const createShopQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists shop (id int AUTO_INCREMENT primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, tagline varchar(100), address varchar(255), image varchar(255))",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table shop created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoShopQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into Shop values
        (01,"Air","Jordan","the smoothest of all","bangalore, marathalli",""),
        (02,"Nike","Sneakers","Just do it","mumbai, bandra",""),
        (03,"Adidas","Shoes","the Goat of Shoes","bihar, patna",""),
        (04,"Puma","Steps","Comfortable as ever","tamil nadu, chennai",""),
        (05,"Crocs","Flippers","Why to hide when you can show it all","delhi",""),
        (06,"Bata","Formals","Bata job lata hai","U.P., lucknow",""),
        (07,"Versace","Leathers","the royal bliss","haryana, gurgaon",""),
        (08,"Relaince","Trends","Growth is life","mumbai, east andheri",""),
        (09,"Campus","Life","simple and significant","bangalore, marathalli","")`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into Shop");
          resolve(result);
        }
      }
    );
  });
};

const createUserQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists user (id int AUTO_INCREMENT primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, email varchar(100) NOT NULL, gender char(1) NOT NULL, address varchar(55) NOT NULL, phone varchar(10) NOT NULL, type varchar(20) NOT NULL)",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table user created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoUserQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into User values
        (50,"Anwesh", "Mishra", "anom.0@gmail.com", "m", "patna", 555, "customer"),
        (51,"Arpan", "Abhishek", "arpan.69@gmail.com","m","bangalore", 666, "manager"),
        (52,"Abhinav","Kumar","abhikumar@gmail.com","m","mumbai",444,"customer"),
        (53,"Amartya","Nambiar","nambo.420@gmail.com","f","kerela", 696, "customer"),
        (54,"Ankit","Saurabh","ankit.chotu@gmail.com","m","delhi", 777, "manager")`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into User");
          resolve(result);
        }
      }
    );
  });
};

const createShoeQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "create table if not exists shoe (id int AUTO_INCREMENT primary key, brand varchar(50) NOT NULL, size int NOT NULL, color varchar(40) NOT NULL, cost int NOT NULL, description text, shop_id int, foreign key(shop_id) references shop(id) on delete cascade on update cascade)",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table shoe created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoShoeQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into Shoe values
      (101,"nike", 9, "white", 15000, "this will redefine your swag and will make everyone feel your presence", 01),
      (102,"nike", 10, "black", 10000, "class recognizes class, this shoe is made by one of the best scientists and manufacturers", 02),
      (103,"adidas",8,"red",7000,"this is thr drip you need in your life",03),
      (104,"relaince", 9, "brown",8500, "the most affordable and durable in this price range",08),
      (105, "versace", 10, "off-white", 17000,"the royalty comes with a price and this shoe will make you look royal",07)`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into Shoe");
          resolve(result);
        }
      }
    );
  });
};

const createManagerQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists manager (id int primary key, shop_id int, foreign key(shop_id) references shop(id), user_id int, foreign key(user_id) references user(id))",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table manager created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoManagerQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT into Manager values(21,1,51),(22,3,54)`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values inserted into Manager");
        resolve(result);
      }
    });
  });
};

const createOrderQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists orders(order_id int, shoe_id int, foreign key(shoe_id) references shoe(id) on delete cascade on update cascade, cus_id int, foreign key(cus_id) references user(id) on delete cascade on update cascade, shop varchar(50) NOT NULL, status varchar(50) NOT NULL, primary key(order_id, shoe_id))",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table orders created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoOrderQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into Orders values
      (120, 102, 50, "Nike Sneakers", "out for delivery" ),
      (121, 104, 52, "Relaince Trends", "order placed"),
      (122,101,53, "Nike Sneakers", "shipped"),
      (123,103,50,"Adidas Shoes","out for delivery"),
      (124,105, 52, "Versace Leathers" ,"order placed")`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into Order");
          resolve(result);
        }
      }
    );
  });
};

const createPaymentQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists payment (id int primary key, ord_id int, foreign key(ord_id) references orders(order_id) on delete cascade on update cascade, user_id int, foreign key(user_id) references user(id) on delete cascade on update cascade, mode varchar(50) NOT NULL, time datetime NOT NULL, amount int NOT NULL)",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table Payment created");
          resolve(result);
        }
      }
    );
  });
};

const insertIntoPaymentQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into Payment values
      (200,120,50,"cash", "2010-03-12 16:35:22", 15000),
      (201,123,50,"cash","2020-04-15 17:20:25", 10000),
      (202,121,52,"upi","2021-12-29 19:56:12", 25500),
      (203,122,53,"card","2015-09-24 23:45:57", 10000),
      (204,124,52,"card","2017-10-24 15:36:47", 15000)`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into Payment");
          resolve(result);
        }
      }
    );
  });
};

const driverFunction = async () => {
  try {
    await createShopQuery();
    await insertIntoShopQuery();
    await createUserQuery();
    await insertIntoUserQuery();
    await createShoeQuery();
    await insertIntoShoeQuery();
    await createManagerQuery();
    await insertIntoManagerQuery();
    await createOrderQuery();
    await insertIntoOrderQuery();
    await createPaymentQuery();
    await insertIntoPaymentQuery();
    db.end();
  } catch (e) {
    console.error(e);
    db.end();
  }
};

driverFunction();
