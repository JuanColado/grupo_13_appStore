const express = require('express');
const app = express();
const path = require('path');
app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(3050,console.log("Esta corriendo en el puerto 3050"));

app.get("/",function(req,res){
        res.render('index')})
app.get("/index",function(req,res){
    res.render('index')})
app.get("/login",function(req,res){
    res.render('login')})

app.get("/productCart",function(req,res){
    res.render('productCart')})

app.get("/productDetail",function(req,res){
    res.render('productDetail')})

app.get("/register",function(req,res){
    res.render('register')})

