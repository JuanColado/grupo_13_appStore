const express = require('express');
const app = express();
const path = require('path');
app.use(express.static("public"));

app.listen(3050,console.log("Esta corriendo en el puerto 3050"));
app.get("/",function(req,res){
    res.sendFile((path.join(__dirname,'/views','/index.html')))})
app.get("/index",function(req,res){
    res.sendFile((path.join(__dirname,'/views/index.html')))})
app.get("/login",function(req,res){
    res.sendFile((path.join(__dirname,'/views','/login.html')))})
app.get("/productCart",function(req,res){
    res.sendFile((path.join(__dirname,'/views','/productCart.html')))})
app.get("/productDetail",function(req,res){
    res.sendFile((path.join(__dirname,'/views','/productDetail.html')))})
app.get("/register",function(req,res){
    res.sendFile((path.join(__dirname,'/views','/register.html')))})