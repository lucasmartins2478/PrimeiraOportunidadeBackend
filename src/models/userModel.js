const connect = require("./connection");

const getAll = async () => {
  try {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Could not retrieve users");
  }


};

const createUser = async (user) => {
  try {
    const conn = await connect();
    const { name, email, phoneNumber, password } = user;
    const query = await conn.query(
      "INSERT INTO users (name, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
      [name, email, phoneNumber, password]
    );
    return query[0];
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Could not create user");
  }
};

const getUserByEmail = async (email) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
  return query[0][0];
};

module.exports = { getAll, createUser, getUserByEmail };
