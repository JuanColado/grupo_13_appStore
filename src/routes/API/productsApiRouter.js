const express = require('express');
const router = express.Router();

const productsApiController = require ("../../controllers/API/productsApiController");

router.get("/products", productsApiController.list);
router.get("/games", productsApiController.games);
router.get("/category", productsApiController.software);

module.exports = router;