const userModel = require("../models/userModel");

const getAll = async (req, res) => {
  const users = await userModel.getAll();

  return res.status(200).json(users);
};

const createUser = async (req, res) => {
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
};

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

module.exports = { getAll, createUser, loginUser };
