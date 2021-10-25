const express = require('express');
const router = express.Router();

const productsController = require ("../../controllers/productsController");
router.get('/productDetail', productsController.productDetail);
router.get('/productCart', productsController.productCart);
// router.get('/products', productsController.productsJson);
router.get('/editProduct',productsController.editProduct);
router.get('/newProduct',productsController.newProduct);
module.exports = router;
