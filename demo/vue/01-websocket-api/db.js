// 1. 导入 mysql 模块
const mysql = require('mysql');
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的IP
  user: 'root', // 登录数据库的账号
  password: 'root', // 登录数据库的密码
  database: 'my_db_02', // 指定操作数据库
})
module.exports = db