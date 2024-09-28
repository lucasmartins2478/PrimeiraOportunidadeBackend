const connect = require("../connection");
const beneficioModel = require("./beneficioModel");
const requisitoModel = require("./requisitoModel");

const getAll = async () => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM vagas");

  for (let vaga of query[0]) {
    const beneficios = await beneficioModel.getAllByVagaId(vaga.id);
    const requisitos = await requisitoModel.getAllByVagaId(vaga.id);
    vaga.beneficios = beneficios;
    vaga.requisitos = requisitos;
  }
  return query[0];
};

const createVaga = async (vaga) => {
  const conn = await connect();
  const { titulo, descricao, requisitos, beneficios, dadosDaEmpresa, modalidade, salario, nivel, empresaId } = vaga;
  const query = await conn.query(
    "INSERT INTO vagas (titulo, descricao, requisitos, beneficios, dadosDaEmpresa, modalidade, salario, nivel, empresaId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [titulo, descricao, requisitos, beneficios, dadosDaEmpresa, modalidade, salario, nivel, empresaId]
  );
  return { id: query[0].insertId, ...vaga };
};

const updateVaga = async (id, vaga) => {
  const conn = await connect();
  const { titulo, descricao, requisitos, beneficios, dadosDaEmpresa, modalidade, salario, nivel } = vaga;
  await conn.query(
    "UPDATE vagas SET titulo = ?, descricao = ?, requisitos = ?, beneficios = ?, dadosDaEmpresa = ?, modalidade = ?, salario = ?, nivel = ? WHERE id = ?",
    [titulo, descricao, requisitos, beneficios, dadosDaEmpresa, modalidade, salario, nivel, id]
  );
  return { id, ...vaga };
};

const getById = async (id) => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM vagas WHERE id = ?", [id]);
  if (vaga) {
    vaga.beneficios = await beneficioModel.getAllByVagaId(vaga.id);
    vaga.requisitos = await requisitoModel.getAllByVagaId(vaga.id);
  }
  return query[0][0];
};

const deleteVaga = async (id) => {
  const conn = await connect();
  await conn.query("DELETE FROM vagas WHERE id = ?", [id]);
};

module.exports = { getAll, createVaga, updateVaga, getById, deleteVaga };
