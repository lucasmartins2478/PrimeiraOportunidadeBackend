const companyModel = require("../models/companyModel");

const getAll = async (req, res) => {
  try {
    const companies = await companyModel.getAll();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar empresas." });
  }
};

const createCompany = async (req, res) => {
  try {
    const newCompany = await companyModel.createCompany(req.body);
    return res.status(201).json(newCompany);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar empresa." });
  }
};

module.exports = { getAll, createCompany };
