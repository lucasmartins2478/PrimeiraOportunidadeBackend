const userModel = require("../models/userModel");

const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

async function createUser(req, res) {
  const { name, email, phoneNumber, password } = req.body;
  if (!name || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const createUser = await userModel.createUser(req.body);
    return res.status(201).json(createUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
}

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ token });
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };