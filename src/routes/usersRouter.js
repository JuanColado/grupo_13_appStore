const express = require('express');
const router = express.Router();
const path = require('path');
const {check} = require('express-validator');
const validaciones = require ('../middlewares/middleware');
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,'../../public/img/users');
        callback(null, folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
const upload = multer({ storage: multerDiskStorage});
const usersController = require ("../controllers/usersController");

router.get('/login', usersController.login);
router.get('/register', usersController.register);
//Muestra un usuario//
router.get('/profile', usersController.usersProfile);

//Muestra lista usuarios//
router.get('/', usersController.users);

//Formulario de registro nuevo usuario//
router.get('/register', usersController.register);
router.post('/profile',upload.single('image'), validaciones, usersController.newUser);

//muestra perfil de un usuario//
router.get('/profile/:id', usersController.usersName);

//Muestra un  usuario para editarlo//
router.get('/usersEdit', usersController.editUsers);

//Edita un usuario//
router.put('/:id/edit', upload.single('image'), usersController.updateUsers);

//Elimina un usuario//
router.delete('/:id', usersController.deleteUsers);


module.exports = router;