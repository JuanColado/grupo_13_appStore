const path = require('path');
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const fs = require("fs");
const productsJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsController = {
    productCart: (req, res) => res.render('productCart'), 
    productDetail: (req, res) => res.render('productDetail'), 
    
}



    module.exports= productsController;
