const connect = require("./connection");

const getAll = async () => {
  const conn = await connect();
  const query = await conn.query("SELECT * FROM empresas");
  return query[0];
};

const createCompany = async (company) => {
  const conn = await connect();
  const { nome_fantasia, cnpj, endereco } = company;
  const query = await conn.query(
    "INSERT INTO empresas (nome_fantasia, cnpj, endereco) VALUES (?, ?, ?)",
    [nome_fantasia, cnpj, endereco]
  );
  return { id: query[0].insertId, ...company };
};

module.exports = { getAll, createCompany };
