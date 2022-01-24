const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const fs = require("fs");
//  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../model/User.js");
const salt = bcrypt.genSaltSync(10);
const db = require("../../database/models");

const usersController = {
  login: (req, res) => res.render("login"),

  processLogin: function (req, res) {
    let promUser = db.User.findAll({
      where: {email: req.body.email}})
      .then(result=>{
        userInDB = result
      if(userInDB.length == 0){
        return res.render('login', { errors: {
          email: {
            msg: 'Email is not registered'
          }
        },
        oldData: req.body
      });
    }else{
      // Chequear password
      // console.log(userInDB[0].dataValues.password);
      if (!bcrypt.compareSync(req.body.password, userInDB[0].dataValues.password)){
          return res.render('login',{
              errors: {
                  password: {
                      msg: 'Password invalid'
                  }
              },
              oldData: req.body
          });
      }else{
        // Usuario OK para loguear
        delete userInDB.password;
        // req.session.user = userInDB;
        req.session.user = userInDB[0].dataValues;
        if(req.body.Login_RememberMe){
            res.cookie('rememberme', req.body.email, {maxAge: (1000 * 60) * 60})
        }
        /* Promise.all(promUser)
        .then((allUser) => {
            return res.render('profile', {allUser})})
         .catch(error => res.send(error)) */
     return res.render("profile", {User : userInDB[0]});
 
    }
}
}) /* Fin del select db.usuario.findAll */
},
   /*  if(userToLogin){
      let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
      if(passwordOk){
        delete userToLogin.password
        req.session.userLogueado = userToLogin;
        if ((req.body.rememberme = !undefined)) {
          res.cookie("rememberme", req.body.email, { maxAge: 600000 });
        }
        return res.redirect("profile");
      }
      
      return res.render('login',{
        errors: {
          email: {
            msg: "Las credenciales son invalidas",
          },
        },
      });
    }
  }, */
  usersProfile: (req, res) => {
    res.render("profile",
    {user: req.session.user}
)},
  //usersDetail: (req, res) => res.render('usersDetail'),
  /* 
  users: (req, res) =>
    res.render("usersList", {
      users: users,
    }), */

register: (req, res) => res.render("register"),

  //Crea nuevo usuario//
 newUser: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

     let userInDB = db.User.findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (user) {
          res.render("register", {
            errors: {
              email: {
                msg: "Este Email ya se encuentra registrado",
              },
            },
          });
        }
      })
      .catch((error) => console.log(error));

      db.User.create( 
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            image:req.file?req.file.filename:'default.png',
            password: bcrypt.hashSync(req.body.password, 10),
            users_category: 2,

          })

          .then(function () {
            res.render("login");
          })
          .catch((error) => console.log(error));
      },
   /*  let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
        id: User[User.length - 1].id + 1,
        ...req.body,
        image: req.file ? req.file.filename : "img/default.png",
        password: bcrypt.hashSync(req.body.password, 10),
      };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users));
      res.redirect("/users/profile");
    } else {
      res.render("register", { errors: errors.mapped(), old: req.body });
    }
  }, */
 
  //Muestra un  usuario para editarlo//
  editUsers: function (req, res) {
    db.User.findByPk(req.params.id)
      .then(function(userToEdit) {res.render("usersEdit", {User: req.session.user})
    })
      .catch((error) => console.log(error));
  /*(req, res) => {
     let id = req.params.id;
    let item = users.find((item) => item.id == id);
    res.render("usersEdit", {
      item: item,
    }); */
  },
  //Edita un usuario//
  updateUsers: function(req, res){
    const validation = validationResult(req);
    if (validation.errors.length > 0) {
      res.render("usersEdit", {
        errors: validation.mapped(),
        oldData: req.body,
        users: {
          id: req.params.id,
        },
      });
    } else {
      db.User.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          image:req.file?req.file.filename:'default.png',
          password: req.session.password,
          users_category: 2,
        },
        {
            where: {id: req.params.id}
        })
        .then(()=>{ return res.redirect("/index")})
        .catch((errors) => console.log(errors));
    // }
   /*  let id = req.params.id;
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
    }); */
  }},
  //Elimina un usuario//
  usersDelete: (req, res) => {
    res.render("deleteUsers")},

  deleteUsers: (req, res) => {
    db.User.destroy({where:{id: req.params.id}, force: true})
      .then(() => {return res.redirect("/index")})
      .catch((err) => console.log(err));
    /* let id = req.params.id;
    let usersFinal = users.filter((usersFinal) => usersFinal.id != id);
    fs.writeFileSync(usersFilePath, JSON.stringify(usersFinal));
    res.redirect("/"); */
    // res.render('users', {'usersFinales': productosFinales}); */
  },

  //para cuando cierra sesion
  logOut: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
  
};
module.exports = usersController;
