const express = require('express');
const app = express();
const path = require('path');
const mainRouter =  require ('../src/routes/mainRouter');
const usersRouter =  require ('../src/routes/usersRouter');
const productsRouter =  require ('../src/routes/productsRouter');

app.use(express.static("../public"));

app.set("view engine", "ejs");

app.listen(3050,console.log("Esta corriendo en el puerto 3050"));

app.use("/", mainRouter);

app.use("/users", usersRouter);

app.use("/products", productsRouter);