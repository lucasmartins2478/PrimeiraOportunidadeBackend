const connect = require("../connection");

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

const getByEmail = async (email) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
  const [user] = query[0];
  return user;
};



const getById = async (id) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
  return query[0][0]; // Retorna um único usuário
};


const updateUser = async (id, user) => {
  const conn = await connect();
  const { name, email, phoneNumber, password } = user;
  const query = await conn.query(
    "UPDATE users SET name = ?, email = ?, phoneNumber = ?, password = ? WHERE id = ?",
    [name, email, phoneNumber, password, id]
  );
  return { id, ...user };
};

const deleteUser = async (id) => {
  const conn = await connect();
  await conn.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = { getAll, getById, getByEmail, createUser, updateUser, deleteUser };
