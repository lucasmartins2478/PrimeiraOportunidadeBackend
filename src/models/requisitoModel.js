const connect = require("../connection");

const getAllByVagaId = async (vagaId) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM requisitos WHERE vagaId = ?", [vagaId]);
  return query[0];
};

const createRequisito = async (requisito) => {
  const conn = await connect();
  const { descricao, vagaId } = requisito;
  const query = await conn.query(
    "INSERT INTO requisitos (descricao, vagaId) VALUES (?, ?)",
    [descricao, vagaId]
  );
  return { id: query[0].insertId, ...requisito };
};

const deleteRequisito = async (id) => {
  const conn = await connect();
  await conn.query("DELETE FROM requisitos WHERE id = ?", [id]);
};

module.exports = { getAllByVagaId, createRequisito, deleteRequisito };
