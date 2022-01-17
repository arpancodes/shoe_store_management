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
        (01,"Air","Jordan","the smoothest of all","bangalore, marathalli","https://seeklogo.com/images/A/air-jordan-logo-66B3A1FAAF-seeklogo.com.png"),
        (02,"Nike","Sneakers","Just do it","mumbai, bandra","https://i.insider.com/53d29d5c6bb3f7a80617ada8?width=1000&format=jpeg&auto=webp"),
        (03,"Adidas","Shoes","the Goat of Shoes","bihar, patna","https://www.fineprintart.com/images/blog/history-adidas-logo/adidas-trefoil-logo.png"),
        (04,"Puma","Steps","Comfortable as ever","tamil nadu, chennai","https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Puma_AG.svg/1200px-Puma_AG.svg.png"),
        (05,"Crocs","Flippers","Why to hide when you can show it all","delhi","https://1000logos.net/wp-content/uploads/2018/12/Crocs-logo.png"),
        (06,"Bata","Formals","Bata job lata hai","U.P., lucknow","https://www.scrolldroll.com/wp-content/uploads/2020/01/Bata-Logo.jpg"),
        (07,"Versace","Leathers","the royal bliss","haryana, gurgaon","https://i.pinimg.com/originals/ea/29/1e/ea291eefaee8beffa519b513a28f314e.png"),
        (08,"Relaince","Trends","Growth is life","mumbai, east andheri","https://findlogovector.com/wp-content/uploads/2019/03/reliance-trends-logo-vector.png"),
        (09,"Campus","Life","simple and significant","bangalore, marathalli","https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Fcampus+new+logo.jpg&h=630&w=1200&q=75&v=20170226&c=1")`,
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
      "CREATE TABLE if not exists user (id int AUTO_INCREMENT primary key, fname varchar(50) NOT NULL, lname varchar(50) NOT NULL, email varchar(100) NOT NULL, gender char(1) NOT NULL, address varchar(55) NOT NULL, phone varchar(10) NOT NULL, type varchar(20) NOT NULL, password varchar(100) NOT NULL)",
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
      `INSERT into User (fname, lname, email, gender, address, phone, type, password)
       values
        ("Anwesh", "Mishra", "anom.0@gmail.com", "m", "patna", 555, "customer", "testpassword"),
        ("Arpan", "Abhishek", "arpan.69@gmail.com","m","bangalore", 666, "manager", "testpassword"),
        ("Abhinav","Kumar","abhikumar@gmail.com","m","mumbai",444,"customer", "testpassword"),
        ("Amartya","Nambiar","nambo.420@gmail.com","f","kerela", 696, "customer", "testpassword"),
        ("Ankit","Saurabh","ankit.chotu@gmail.com","m","delhi", 777, "manager", "testpassword")`,
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
      "create table if not exists shoe (id int AUTO_INCREMENT primary key, brand varchar(50) NOT NULL, size int NOT NULL, color varchar(40) NOT NULL, cost int NOT NULL, description text, shop_id int, foreign key(shop_id) references shop(id) on delete cascade on update cascade, image varchar(300))",
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
      `INSERT into Shoe (brand, size, color, cost, description, shop_id, image)
       values
      ("Jordan Delta", 9, "brown", 15000, "comfortable and durable", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/200faef3-9f80-4d5f-83e1-37c57851bb89/jordan-delta-2-mens-shoes-0zS4N1.png"),
      ("Jordan Max 270", 10, "brown", 15000, "comfort and durable", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/dfc55052-d324-4194-89ba-455f1058b9e2/air-max-270-mens-shoes-KkLcGR.png"),
      ("Jordan Retro", 10, "yellow", 12000, "royal ", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/39a83668-705d-49b0-aed5-ede91d2241aa/jordan-ma2-womens-shoes-NTBqKg.png"),
      ("Jordan xxx", 10, "brown", 15000, "comfortable", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3a07a8fd-b276-4841-9d96-6b16fac562e8/air-jordan-1-low-g-golf-shoes-94QHHm.png"),
      ("Jordan lit", 10, "white", 15000, "durable", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5aafb79f-1a67-401b-bce7-e6f3924b2752/air-jordan-og-womens-shoes-lCKXf8.png"),
      ("Jordan Maxy", 10, "black", 15000, "comfortable and durable", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d332ff4-8e8d-4fa4-8888-aa42dcd9e422/air-jordan-og-womens-shoe-DZ7xk2.png"),
      ("Jordan 1 mid", 10, "white", 10000, "classy and pure street fashion", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/61a4f2d8-0a65-4b34-8113-3163aea9198b/air-jordan-1-mid-shoes-Z4WQkS.png"),
      ("Jordan max aura 3", 8,"black",7000,"Black has its own identity", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4b1d61f1-da74-4812-929c-0b1ad8c8e674/jordan-max-aura-3-mens-shoes-lqz9jG.png"),
      ("Jordan Lebron 19", 9, "blue",8500, "the drip all over it",01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c2db773f-985f-4676-88ec-4674abf99594/lebron-19-basketball-shoe-wnc35S.png"),
      ("Jordan Air Max 90", 10, "rainbow", 17000,"the colourful glismpse of rainbow reflects on it", 01, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bc921490-8f56-4a14-8d38-5df8cc8af6d9/air-max-90-x-lhm-shoes-0bFJ5Z.png"),
      ("Nike zoomx", 10, "yellow", 17000,"the colourful glismpse of rainbow reflects on it",02, "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f4777c67-eb80-4315-88a5-13bdd5d5efa9/zoomx-vaporfly-next-2-ekiden-road-racing-shoes-9FXr0Z.png"),
      ("Nike lebron 9", 10, "black", 17000,"exclusive lebron stylish",02, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/88bd2660-a67c-4bc5-a606-79a03de31665/lebron-9-shoes-j6jK09.png"),
      ("Adidas superstar", 10, "black", 17000,"fashion for the young",03, "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/782b27d3824f467d81fbad0800cbd207_9366/superstar-shoes.jpg"),
      ("Adidas usa 84", 10, "green", 17000,"natural kick with greenish look",03, "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6d094394e1784707b5b2ad1f0091396c_9366/usa-84-shoes.jpg"),
      ("Puma Gymx", 10, "black", 14000,"natural kick with blackish look",04, "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/193157/03/sv01/fnd/IND/fmt/png/Radiate-Low-Alt-Training-Shoes"),
      ("Puma persist", 10, "blue", 18000,"natural kick with blue-sea look",04, "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/192616/04/sv01/fnd/IND/fmt/png/Persist-XT-Knit-SoftFoam+-Men%E2%80%99s-Training-Shoes"),
      ("Crocs pacer", 10, "off-white", 16000,"premium quality with asestatic style",05, "https://www.shopcrocs.in/media/catalog/product/2/0/205234_160_alt140.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"),
      ("Crocs offcourt", 10, "deep blue", 10000, "classic blue with style",05, "https://www.shopcrocs.in/media/catalog/product/2/0/206011_462_alt140.jpg?optimize=medium&bg-color=255%2C255%2C255&fit=cover&height=1200&width=960&auto=webp&format=pjpg"),
      ("Bata originals", 10, "brown", 12000,"best look for office as you can get",06, "https://www.bata.in/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dw058bbed3/images/tile/8544607_2.jpeg?sw=330"),
      ("Bata Hush", 10, "black", 13000,"Black classic for office or party or anywhere",06, "https://www.bata.in/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dw064e40dc/images/tile/8346491_2.jpeg?sw=330"),
      ("Versace Trigreca", 10, "black", 150000,"the best you get in a shoe",07, "https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dwa1e973d6/original/90_DSU8094-D15TCG_D4D_20_TrigrecaTrainers-TrigrecaSneakers-versace-online-store_5_3.jpg?sw=850&sh=1200&sm=fit"),
      ("Versace Trigreca 2", 10, "white", 170000,"better than the best in white shade",07, "https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw631cadf9/original/90_DSU8094-D16TCG_D014H_20_TrigrecaTrainers-TrigrecaSneakers-versace-online-store_1_3.jpg?sw=414&sh=582&sm=fit&sfrm=jpg"),
      ("Trends attitude", 10, "black", 20000,"stylish with classic black",08, "https://assets.ajio.com/medias/sys_master/root/20210318/khGo/60537e057cdb8c1f14668d2d/hi-attitude_black_panelled_round-toe_ballerinas.jpg"),
      ("Trends hi", 10, "yellow", 16000,"casual yellow you can wear anywhere",08, "https://assets.ajio.com/medias/sys_master/root/20210218/CM6f/602e66ce7cdb8c1f1443705d/hi-attitude_brown_printed_slip-on_causal_shoes.jpg"),
      ("Campus First", 10, "green", 15000,"comfort at its best",09, "https://cdn.shopify.com/s/files/1/0607/6678/1671/products/FIRST-11G-787-WHT-SIL-B.ORG_2_460x.jpg?v=1639241973"),
      ("Campus Asia", 10, "black", 10000,"casual cum stylish you can put on going anywhere",09, "https://cdn.shopify.com/s/files/1/0607/6678/1671/products/CG-352-G-BLK-RED-1_460x.jpg?v=1639240837")`,
      
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
    db.query(`INSERT into Manager values(21,1,1),(22,3,4)`, (err, result) => {
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
      "CREATE TABLE if not exists orders(order_id int, shoe_id int, foreign key(shoe_id) references shoe(id) on delete cascade on update cascade, cus_id int, foreign key(cus_id) references user(id) on delete cascade on update cascade, status varchar(50) NOT NULL, primary key(order_id, shoe_id), quantity int NOT NULL, amount int NOT NULL)",
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
      (120, 102, 1, "out for delivery", 1, 14000 ),
      (121, 104, 2, "order placed", 2, 15000),
      (122,101,3, "shipped", 2, 10000),
      (123,103,1,"out for delivery", 1, 13000),
      (124,105, 2,"order placed", 1, 17000)`,
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
      "CREATE TABLE if not exists payment (id int primary key, ord_id int, foreign key(ord_id) references orders(order_id) on delete cascade on update cascade, mode varchar(50) NOT NULL, time datetime NOT NULL, amount int NOT NULL, status varchar(200) NOT NULL)",
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
      (200,120,"cash", "2010-03-12 16:35:22", 15000,"payment done"),
      (201,123,"cash","2020-04-15 17:20:25", 10000,"payment pending"),
      (202,121,"upi","2021-12-29 19:56:12", 25500,"transaction processing"),
      (203,122,"card","2015-09-24 23:45:57", 10000,"payment done"),
      (204,124,"card","2017-10-24 15:36:47", 15000,"payment pending")`,
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

const createGLOBALQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE if not exists _GLOBAL( _key varchar(50), value int)",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Table _GLOBAL created");
          resolve(result);
        }
      }
    );
  });
};
const insertIntoGLOBALQuery = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT into _GLOBAL values
      ("LAST_ORDER", 1 )`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Values inserted into _GLOBAL");
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
    // await insertIntoOrderQuery();
    await createPaymentQuery();
    // await insertIntoPaymentQuery();
    await createGLOBALQuery();
    await insertIntoGLOBALQuery();
    db.end();
  } catch (e) {
    console.error(e);
    db.end();
  }
};

driverFunction();
