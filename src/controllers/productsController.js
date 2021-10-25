const path = require('path');
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const fs = require("fs");
const productsController = {
    productCart: (req, res) => res.render('productCart'), 
    productDetail: (req, res) => res.render('productDetail'), 
    // productsJson: JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),
    editProduct: (req,res) => res.render('editProduct'), 
    newProduct: (req,res) => res.render('newProduct'), 
    }
    module.exports= productsController;
