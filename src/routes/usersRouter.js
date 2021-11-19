const express = require('express');
const router = express.Router();
const path = require('path');
const {check} = require('express-validator');
const validaciones = require ('../middlewares/middleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,'../../public/img/users');
        callback(null, folder);
    },
    filename: (req,file,callback) => {
        let imageName =  Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
const upload = multer({ storage: multerDiskStorage});
const usersController = require ("../controllers/usersController");

//Formulario y boton de login//
router.get('/login', authMiddleware, usersController.login);
router.post('/login', validaciones, usersController.processLogin)

//Muestra un usuario//
router.get('/profile/', guestMiddleware, usersController.usersProfile);

//Muestra lista usuarios//
router.get('/', usersController.users);

//Formulario y boton de registro nuevo usuario//
router.get('/register', authMiddleware, usersController.register);
router.post('/profile',upload.single('image'), validaciones, usersController.newUser);

//Muestra un  usuario para editarlo//
router.get('/usersEdit', usersController.editUsers);

//Edita un usuario//
router.put('/:id/edit', upload.single('image'), usersController.updateUsers);

//Elimina un usuario//
router.delete('/:id', usersController.deleteUsers);


module.exports = router;