const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); 
const mainRouter =  require ('../src/routes/mainRouter');
const usersRouter =  require ('../src/routes/usersRouter');
const productsRouter =  require ('../src/routes/productsRouter');
const session = require('express-session')

app.use(express.urlencoded({extended: false}));
app.use(session({resave: false ,secret: "AppStore!!", saveUninitialized: false}))
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static("../public"));
//app.use(express.static("../public/img"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views')); 

app.listen(3050,console.log("Esta corriendo en el puerto 3050"));

app.use("/", mainRouter);

app.use("/users", usersRouter);

app.use("/products", productsRouter);

app.use((req,res,next)=> {
    res.status(404).render('404-page');
    next();
})