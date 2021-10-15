const express = require('express');
const router = express.Router();

const mainController = require ("../../controllers/mainController");
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);
module.exports = router;
