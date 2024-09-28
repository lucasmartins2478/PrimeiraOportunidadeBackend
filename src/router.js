const express = require("express")
const userController = require("./controllers/userController")
const auth = require("./middleware/auth");
const express = require("express");
const userController = require("../controllers/userController");
const companyController = require("../controllers/companyController");
const vagaController = require("../controllers/vagaController");
const candidatoController = require("../controllers/candidatoController");

const router = express.Router();

router.get("/users", auth, userController.getAll);

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Rotas para Empresas
router.get("/companies", companyController.getAll);
router.post("/companies", companyController.createCompany);

// Rotas para Vagas
router.get("/vagas", vagaController.getAll);
router.post("/vagas", vagaController.createVaga);

// Rotas para Candidatos
router.get("/candidatos", candidatoController.getAll);
router.post("/candidatos", candidatoController.createCandidato);

module.exports = router;

router.post("/login", userController.loginUser);

module.exports = router