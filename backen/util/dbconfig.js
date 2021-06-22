const mysql = require("mysql");

module.exports = {
  config: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "lpl",
    multipleStatements: true
  },

  sqlConnect: function (sql, sqlArr, callback) {
    let pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("连接数据库出错");
        return;
      }
      // 创建连接池
      conn.query(sql, sqlArr, callback);
      // 释放连接
      conn.release()
    });
  },

  sySqlConnect: function (sql, sqlArr) {
    return new Promise((resolve, rejcet) => {
      let pool = mysql.createPool(this.config);
      pool.getConnection((err, conn) => {
        if (err) rejcet(err);
        else {
          conn.query(sql, sqlArr, (err, data) => {
            if (err) rejcet(err);
            else {
              resolve(data);
            }
          });
          conn.release();
        }
      });
    }).catch((err) => console.log(err));
  },
};
