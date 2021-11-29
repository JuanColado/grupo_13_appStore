const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); 
const mainRouter =  require ('../src/routes/mainRouter');
const usersRouter =  require ('../src/routes/usersRouter');
const productsRouter =  require ('../src/routes/productsRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLogueado = require('../src/middlewares/userLoggedMiddleware');

app.use(express.urlencoded({extended: false}));
app.use(session({resave: false ,secret: "AppStore!!", saveUninitialized: false}))
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static("../public"));
app.use(userLogueado);
//app.use(express.static("../public/img"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views')); 

app.listen(3053,console.log("Esta corriendo en el puerto 3053"));

app.use("/", mainRouter);

app.use("/users", usersRouter);

app.use("/products", productsRouter);

app.use((req,res,next)=> {
    res.status(404).render('404-page');
    next();
})