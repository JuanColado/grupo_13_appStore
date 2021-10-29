const express = require('express');
const router = express.Router();

const productsController = require ("../controllers/productsController");

//router.get('/productDetail', productsController.productDetail);

router.get('/productCart', productsController.productCart);


router.get('/', productsController.products);

router.get('/productCreate', productsController.productCreate);
router.post('/', productsController.newProduct);

router.get('/productDetail/:id', productsController.productName);

router.get('/:id/edit', productsController.editProduct);

router.post('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);


module.exports = router;
