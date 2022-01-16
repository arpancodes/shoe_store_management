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
    db.query(`SELECT * from Shoe where id = ?`, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("Values fetched from Shoes");
        resolve(result[0]);
      }
    });
  });
};
module.exports = { comparePassword, insertIntoUserQuery, getUserByEmail, getShopById, getShops, getShoesByShopID };
