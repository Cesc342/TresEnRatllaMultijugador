const express = require("express");
const app = express();

const path = require("path");
const colors = require("colors");

const io = require("./io");
const router = require("./router.js");

const HOST = "localhost";
const PORT = 3000;

app.use(router);

const server = app.listen(PORT,()=>{
    console.log(`Servidor funcionant en el host ${HOST.bold} en el port nº ${PORT.toString().bold}`.grey);
});

io.listen(server);
