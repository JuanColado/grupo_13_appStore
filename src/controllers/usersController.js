const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const fs = require("fs");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require('../model/User.js')
const salt = bcrypt.genSaltSync(10);
const db = require("../../database/models")

const usersController = {
  login: (req, res) => res.render("login"),

  processLogin: function (req, res) {
    let userToLogin = User.findByField('email', req.body.email);
    if(userToLogin){
      let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
      if(passwordOk){
        delete userToLogin.password
        req.session.userLogueado = userToLogin;
        if(req.body.rememberme  =! undefined){
          res.cookie('rememberme', req.body.email, {maxAge:600000});
        }
        return res.redirect('profile')
      }
      return res.render('login',{
        errors: {
          email: {
            msg: 'Las credenciales son invalidas'
          }
        }
      });
    }
  },
  usersProfile: (req, res) => {
    res.render("profile",
    {user: req.session.userLogueado}
)},
  //usersDetail: (req, res) => res.render('usersDetail'),
/* 
  users: (req, res) =>
    res.render("usersList", {
      users: users,
    }), */

  register: (req, res) => res.render("register"),
  //Crea nuevo usuario//
  // newUser: (req, res) => {
  //   let errors = validationResult(req);
  //   if (errors.isEmpty()) {
  //     let newUser = {
  //       id: users[users.length - 1].id + 1,
  //       ...req.body,
  //       image: req.file ? req.file.filename : "img/default.png",
  //       password: bcrypt.hashSync(req.body.password, 10),
  //     };
  //     users.push(newUser);
  //     fs.writeFileSync(usersFilePath, JSON.stringify(users));
  //     res.redirect("/users/profile");
  //   } else {
  //     res.render("register", { errors: errors.mapped(), old: req.body });
  //   }
  // },



  newUser: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("/users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

     db.Users.findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (user) {
          res.render("/users/register", {
            errors: {
              email: {
                msg: "Este Email ya se encuentra registrado",
              },
            },
          });
        }
      })
      .catch((err) => console.log(err));


      db.Users.create( 
          {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              image:req.file?req.file.filename:'img/default.png',
              user_category_id: 2,
  
          })
        
      .then(()=> {
          return res.redirect('/profile')})
      
    },
    
 
  //Muestra un  usuario para editarlo//
  editUsers: (req, res) => {
    let id = req.params.id;
    let item = users.find((item) => item.id == id);
    res.render("usersEdit", {
      item: item,
    });
  },
  //Edita un usuario//
  updateUsers: (req, res) => {
    let id = req.params.id;
    let editUsers = users.find((item) => item.id == id);

    editUsers = {
      id: editUsers.id,
      ...req.body,
      image: "img/" + req.file.filename,
    };
    let nuevoItem = users.map((item) => {
      if (item.id == editUsers.id) {
        return (item = {
          ...editUsers,
        });
      }
      return item;
    });
    fs.writeFileSync(usersFilePath, JSON.stringify(nuevoItem, null, " "));
    // res.render('producDetail', {'users': users});
    res.render("/profile", {
      users,
    });
  },
  //Elimina un usuario//
  deleteUsers: (req, res) => {
    let id = req.params.id;
    let usersFinal = users.filter((usersFinal) => usersFinal.id != id);
    fs.writeFileSync(usersFilePath, JSON.stringify(usersFinal));
    res.redirect("/");
    // res.render('users', {'usersFinales': productosFinales}); */
  },
  //para cuando cierra sesion
  logOut: (req,res)=>{
    req.session.destroy();
    return res.redirect('/');
  },
};
module.exports = usersController;

