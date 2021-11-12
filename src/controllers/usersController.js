const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const fs = require("fs");
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    login: (req, res) => res.render('login'),  

     usersProfile: (req, res) => 
        res.render('profile'), 
    //usersDetail: (req, res) => res.render('usersDetail'), 
    
    users: (req,res) => 
        res.render('usersList', {users: users}),
    
    register: (req,res) => 
        res.render('register'),
//Crea nuevo usuario//
    newUser: (req,res) => {
        let newUser = {
            id: users[users.length-1].id +1,
            ...req.body,
            image:req.file?req.file.filename:'img/default.png',
        };
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.redirect('/users/profile');
    } ,
//muestra perfil de un usuario//
    usersName:(req,res) => {
        let id= req.params.id
        let item= users.find(item => item.id == id)
        res.render( 'profile', {'item': item})
    },
//Muestra un  usuario para editarlo//
    editUsers: (req,res) => {
        let id= req.params.id;
        let item= users.find(item => item.id == id);
        res.render('usersEdit', {'item': item})
        },
//Edita un usuario//
     updateUsers:  (req,res) => {
        let id= req.params.id;
        let editUsers= users.find(item => item.id == id);

        editUsers={
            id: editUsers.id,
            ...req.body,
            image: "img/" + req.file.filename,
        }
       let nuevoItem = users.map(item => {
           if(item.id == editUsers.id) {
               return item = {...editUsers};
           }
           return item
       })
       fs.writeFileSync(usersFilePath, JSON.stringify(nuevoItem, null, ' '));
        // res.render('producDetail', {'users': users});
        res.render('/profile', {users});
        
    }, 
    //Elimina un usuario//
    deleteUsers:  (req,res) => {
        let id= req.params.id;
        let usersFinal= users.filter(usersFinal => usersFinal.id !=id);
        fs.writeFileSync(usersFilePath, JSON.stringify(usersFinal));
        res.redirect('/');
        // res.render('users', {'usersFinales': productosFinales}); */
    }
    }
    module.exports= usersController;