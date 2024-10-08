const express = require("express");
const router = require("./routes/router");
const cors = require('cors');
const swagger = require("./swagger");
swagger(app);


const app = express();

app.use(express.json())
app.use(cors());
app.use("/api", router);

module.exports = app;