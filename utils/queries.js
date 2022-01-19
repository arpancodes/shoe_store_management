const bcrypt = require("bcrypt");
const mysql = require("mysql");
const SALT_WORK_FACTOR = 10;

const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB, //ravenbooks
});

const insertIntoUserQuery = (
  fname,
  lname,
  email,
  gender,
  address,
  phone,
  type,
  password
) => {
  return new Promise((resolve, reject) => {
    // hash password
    let hashPass = "";
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return reject(err);

      // hash the password using our new salt
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err);

        // override the cleartext password with the hashed one
        hashPass = hash;
        console.log(hashPass);
        db.query(
          `INSERT into User (fname, lname, email, gender, address, phone, type, password)
					 values
						(?, ?, ?, ?, ?, ?, ?, ?)`,
          [fname, lname, email, gender, address, phone, type, hashPass],
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
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * from User where email = ?`, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from User");
        resolve(result[0]);
      }
    });
  });
};

const comparePassword = (candidatePassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

const getShopById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * from shop where id = ?`, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from User");
        resolve(result[0]);
      }
    });
  });
};

const getShops = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * from shop `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from shop");
        resolve(result);
      }
    });
  });
};

const getShoesByShopID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * from Shoe where shop_id = ?`, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from Shoes");
        resolve(result);
      }
    });
  });
};

const getShoeByID = (id, shopID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT Shoe.brand, Shop.name as shop_name, Shoe.id, Shoe.size, Shoe.color, Shoe.cost, Shoe.description, Shoe.image  from Shoe, Shop where Shoe.id = ? and shop_id = ? and Shoe.shop_id = Shop.id`,
      [id, shopID],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values fetched from Shoes");
          resolve(result[0]);
        }
      }
    );
  });
};

const getLastOrderNo = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT value from _GLOBAL where _key = "LAST_ORDER"`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values fetched from _GLOBAL");
          resolve(result[0]);
        }
      }
    );
  });
};

const getShopOrders = (UserID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT order_id, shoe_id, cus_id, o.status, time, a.id, ord_id, quantity, a.status, amount, brand, size, color, cost, description, p.id, s.image, fname, lname from manager m, shoe s, orders o, payment a, shop p where m.user_id = ? and m.shop_id = s.shop_id and s.id = o.shoe_id and p.id = s.shop_id and a.ord_id = o.order_id`,
      [UserID],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values fetched from tables");
          resolve(result);
        }
      }
    );
  });
};

const getItemPrice = (ItemID) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT cost from Shoe where id = ?`, [ItemID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from Shoes");
        resolve(result[0]);
      }
    });
  });
};

const createOrder = (CompleteOrder) => {
  return new Promise((resolve, reject) => {
    db.query(`Insert into orders values ?`, [CompleteOrder], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values inserted in orders");
        resolve(result);
      }
    });
  });
};

const getOrderById = (OrderID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * from orders where order_id = ?`,
      [OrderID],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values fetched from orders");
          resolve(result);
        }
      }
    );
  });
};

const createPayment = (ord_id, mode, amount, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      `Insert into payment (ord_id, mode, amount, status) values (?, ?, ?, ?)`,
      [ord_id, mode, amount, status],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted in payment");
          resolve(result);
        }
      }
    );
  });
};

const updateUserAsManager = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE User set type = 'manager' where id = ?`,
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted in orders");
          resolve(result);
        }
      }
    );
  });
};

const createManager = (userId, shopId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `Insert into Manager (shop_id, user_id) values (?)`,
      [[shopId, userId]],
      async (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted in Manager");
          try {
            await updateUserAsManager(userId);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        }
      }
    );
  });
};

const updateOrders = (status, order_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE orders set status = ? where order_id = ?`,
      [status, order_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted in orders");
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  comparePassword,
  insertIntoUserQuery,
  getUserByEmail,
  getShopById,
  getShops,
  getShoesByShopID,
  getShoeByID,
  getLastOrderNo,
  getShopOrders,
  getItemPrice,
  createOrder,
  createManager,
  createPayment,
  getOrderById,
  updateOrders,
};
