const connect = require("../connection");

const getAll = async () => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM candidatos");
  return query[0];
};

const createCandidato = async (candidato) => {
  const conn = await connect();
  const { usuarioId, vagaId, dataCandidatura } = candidato;
  const query = await conn.query(
    "INSERT INTO candidatos (usuarioId, vagaId, dataCandidatura) VALUES (?, ?, ?)",
    [usuarioId, vagaId, dataCandidatura]
  );
  return { id: query[0].insertId, ...candidato };
};

const getById = async (id) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM candidatos WHERE id = ?", [id]);
  return query[0][0];
};

module.exports = { getAll, createCandidato, getById };
