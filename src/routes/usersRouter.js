const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,'../../public/img');
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

router.get('/profile', usersController.usersProfile);


router.get('/', usersController.users);

router.get('/register', usersController.register);
router.post('/',upload.single('image'), usersController.newUser);

router.get('/profile/:id', usersController.usersName);

router.get('/:id/edit', usersController.editUsers);

router.put('/:id/edit', upload.single('image'), usersController.updateUsers);
router.delete('/:id', usersController.deleteUsers);


module.exports = router;