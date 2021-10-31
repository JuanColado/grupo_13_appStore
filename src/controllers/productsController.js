const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const fs = require("fs");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    
    productCart: (req, res) => 
        res.render('productCart'), 
    //productDetail: (req, res) => res.render('productDetail'), 
    
    products: (req,res) => 
        res.render('products', {products: products}),
    
    productCreate: (req,res) => 
        res.render('productCreate'),

    newProduct: (req,res) => {
        let newProduct = {
            id: products[products.length-1].id +1,
            ...req.body,
            image: "img/" + req.file.filename,
            category: req.body.category
        };
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.render('products', {'products': products});
    } ,

    productName:(req,res) => {
        let id= req.params.id
        let item= products.find(item => item.id == id)
        res.render( 'productDetail', {'item': item})
    },

    editProduct: (req,res) => {
        let id= req.params.id;
        let item= products.find(item => item.id == id);
        res.render('editProduct', {'item': item})
        },

     updateProduct:  (req,res) => {
        let id= req.params.id;
        let editProduct= products.find(item => item.id == id);

        editProduct={
            id: editProduct.id,
            ...req.body,
            image: "img/" + req.file.filename,
            category: req.body.category
        }
       let nuevoItem = products.map(item => {
           if(item.id == editProduct.id) {
               return item = {...editProduct};
           }
           return item
       })
       fs.writeFileSync(productsFilePath, JSON.stringify(nuevoItem, null, ' '));
        // res.render('producDetail', {'products': products});
        res.redirect('/');
        
    }, 
    deleteProduct:  (req,res) => {
        let id= req.params.id;
        let productosFinales= products.filter(productosFinales => productosFinales.id !=id);
        fs.writeFileSync(productsFilePath, JSON.stringify(productosFinales));
        res.redirect('/');
        // res.render('products', {'productosFinales': productosFinales});
    },

    

    }
    module.exports= productsController;
