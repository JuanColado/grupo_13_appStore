
const fs = require('fs');
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = {
    fileName: usersFilePath,
    //busca usuarios de db
getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

//metodo q me va a generar el siguiente ID q corresponde
generateID: function(){
    let todosUsuarios= this.getData();
    let ultimoUsuario = todosUsuarios.pop(); //popea el id del ultimo usuario registrado
    return ultimoUsuario.id +1;   //te devuelve el ultimo id +1
 },

    //3.Busca un usuario a traves de su id 
findByPk: function(id){
    let todosUsuarios = this.getData();
    let usuarioEncontrado = todosUsuarios.find(unUsuario => unUsuario.id === id) //por cada uno de los usuarios le preg si es el mismo id y devuelve el usuario
return usuarioEncontrado;},

//2. Busca un usuario a traves de su algun campo del json 
findByField: function(field, text){
    const todosUsuarios = this.getData();
    let usuarioEncontrado = todosUsuarios.find(unUsuario => unUsuario[field] === text); //por el campo q le demos se fija si existe un usuario con el texto q le damos
return usuarioEncontrado;},

//guardar usuario en base de datos
create: function(userData) {
 let todosUsuarios = this.getData();
 let nuevoUsuario = {
     id: this.generateID(),
     ...userData 
 } //..userData me va a dar toda la info del objeto literal cone xpressgener
 todosUsuarios.push(nuevoUsuario); //agrega al nuevo usuario en el array
fs.writeFileSync(this.fileName, JSON.stringify(todosUsuarios, null, ' '));  //lo pasa a formato JSON
 return true},

//elimina 1 usuario
 delete:function(id) {
    let todosUsuarios = this.getData();
    let usuariosFinales = todosUsuarios.filter(unUsuario=> unUsuario.id !==id) //se guarda todos los usuarios q no sean = al id, y borra al id
   fs.writeFileSync(this.fileName, JSON.stringify(usuariosFinales, null, ' '));  //lo pasa a formato JSON sobreescribiendo usuariosFinales, osea ya con el borrado
 return true
}}

module.exports = User;