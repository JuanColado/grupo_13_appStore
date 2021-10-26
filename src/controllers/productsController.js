const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const fs = require("fs");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    productCart: (req, res) => res.render('productCart'), 
    //productDetail: (req, res) => res.render('productDetail'), 

    editProduct: (req,res) => res.render('editProduct'), 
    products: (req,res) => res.render('products', {'products': products}),
    productCreate: (req,res) => res.render('productCreate'),
    newProduct: (req,res) => {
        let newProduct = {
            id: products[products.length-1].id +1,
            ...req.body,
            image:'default-image.png'
        };
        products.push(newProduct)
        console.log(products)
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.render('products', {'products': products});
    } ,
    productName:(req,res) => {
        let id= req.params.id

        let product= products.find(product => products.id == id)
        res.render( 'productDetail', {product: product})
    }
    }
    module.exports= productsController;
