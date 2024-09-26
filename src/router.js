const express = require("express")
const userController = require("./controllers/userController")
const auth = require("./middleware/auth");

router.get("/users", auth, userController.getAll);


const router = express()

router.get("/users", userController.getAll)

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser);

module.exports = router