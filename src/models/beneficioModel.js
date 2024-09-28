const connect = require("../connection");

const getAllByVagaId = async (vagaId) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM beneficios WHERE vagaId = ?", [vagaId]);
  return query[0];
};

const createBeneficio = async (beneficio) => {
  const conn = await connect();
  const { descricao, vagaId } = beneficio;
  const query = await conn.query(
    "INSERT INTO beneficios (descricao, vagaId) VALUES (?, ?)",
    [descricao, vagaId]
  );
  return { id: query[0].insertId, ...beneficio };
};

const deleteBeneficio = async (id) => {
  const conn = await connect();
  await conn.query("DELETE FROM beneficios WHERE id = ?", [id]);
};

module.exports = { getAllByVagaId, createBeneficio, deleteBeneficio };
