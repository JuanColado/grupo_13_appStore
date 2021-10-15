const express = require('express');
const app = express();
const path = require('path');
const mainRouter =  require ('../src/views/routes/mainRouter');
const usersRouter =  require ('../src/views/routes/usersRouter');
const productsRouter =  require ('../src/views/routes/productsRouter');

app.use(express.static("../public"));

app.set("view engine", "ejs");

app.listen(3050,console.log("Esta corriendo en el puerto 3050"));

app.get("/", mainRouter);

app.get("/index",mainRouter);
app.get("/login", usersRouter);

app.get("/productCart", productsRouter);

app.get("/productDetail", productsRouter);

app.get("/register",usersRouter);

app.get('/editProduct', (req,res) => {
    res.render(path.resolve(__dirname, 'views/editProduct.ejs'));
    });

app.get('/newProduct', (req,res) => {
    res.render(path.resolve(__dirname, 'views/newProduct.ejs'));
        });