const path = require('path');
const productsFilePath = path.resolve(__dirname, '../data/products.json');
const fs = require("fs");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    productCart: (req, res) => res.render('productCart'), 
    productDetail: (req, res) => res.render('productDetail'), 

    editProduct: (req,res) => res.render('editProduct'), 
    newProduct: (req,res) => res.render('newProduct'), 
    products: (req,res) => res.render('products', {'products': products}),
    
    }
    module.exports= productsController;
