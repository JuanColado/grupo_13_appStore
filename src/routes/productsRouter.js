const express = require('express');
const router = express.Router();

const productsController = require ("../controllers/productsController");

router.get('/productDetail', productsController.productDetail);
router.get('/productCart', productsController.productCart);

router.get('/editProduct',productsController.editProduct);
router.get('/newProduct',productsController.newProduct);

router.get('/', productsController.products);



module.exports = router;
