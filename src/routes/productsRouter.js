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
const productsController = require ("../controllers/productsController");

//router.get('/productDetail', productsController.productDetail);

router.get('/productCart', productsController.productCart);


router.get('/', productsController.products);

router.get('/productCreate', productsController.productCreate);
router.post('/',upload.single('image'), productsController.newProduct);

router.get('/productDetail/:id', productsController.productName);

router.get('/:id/edit', productsController.editProduct);

router.put('/:id/edit', upload.single('image'), productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);


module.exports = router;
