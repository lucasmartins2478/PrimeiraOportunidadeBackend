const connect = require("./connection");

const getAll = async () => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM users");
  return query[0];
};

const createUser = async (user) => {
  const conn = await connect();
  const { name, email, phoneNumber, password } = user;
  const query = await conn.query(
    "INSERT INTO users (name, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
    [name, email, phoneNumber, password]
  );
  return query[0];
};

module.exports = { getAll, createUser };
