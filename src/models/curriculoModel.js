const connect = require("../connection");

const getAll = async () => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM curriculos");
  return query[0];
};

const createCurriculo = async (curriculo) => {
  const conn = await connect();
  const { usuarioId, escolaridade, experiencia, habilidades, idiomas } = curriculo;
  const query = await conn.query(
    "INSERT INTO curriculos (usuarioId, escolaridade, experiencia, habilidades, idiomas) VALUES (?, ?, ?, ?, ?)",
    [usuarioId, escolaridade, experiencia, habilidades, idiomas]
  );
  return { id: query[0].insertId, ...curriculo };
};

const getById = async (id) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM curriculos WHERE id = ?", [id]);
  return query[0][0];
};

const updateCurriculo = async (id, curriculo) => {
  const conn = await connect();
  const { escolaridade, experiencia, habilidades, idiomas } = curriculo;
  await conn.query(
    "UPDATE curriculos SET escolaridade = ?, experiencia = ?, habilidades = ?, idiomas = ? WHERE id = ?",
    [escolaridade, experiencia, habilidades, idiomas, id]
  );
  return { id, ...curriculo };
};

const deleteCurriculo = async (id) => {
  const conn = await connect();
  await conn.query("DELETE FROM curriculos WHERE id = ?", [id]);
};

module.exports = { getAll, createCurriculo, getById, updateCurriculo, deleteCurriculo };
