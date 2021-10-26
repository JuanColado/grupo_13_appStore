const express = require('express');
const router = express.Router();

const productsController = require ("../controllers/productsController");

//router.get('/productDetail', productsController.productDetail);

router.get('/productCart', productsController.productCart);

router.get('/editProduct',productsController.editProduct);

router.get('/', productsController.products);

router.get('/productCreate', productsController.productCreate);
router.post('/', productsController.newProduct);

router.get('/productDetail/:id', productsController.productName)



module.exports = router;
