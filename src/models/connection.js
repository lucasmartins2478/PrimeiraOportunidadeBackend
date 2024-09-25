const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
  if (global.connection && global.connection.state !== "disconnect")
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: 3306,
  });
  console.log("Conectou no banco de dados");
  global.connection = connection;
  return connection;
}

module.exports = connect;
