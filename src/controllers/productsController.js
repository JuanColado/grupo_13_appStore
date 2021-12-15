const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const fs = require("fs");
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../../database/models")


const productsController = {
    
    productCart: (req, res) => 
        res.render('productCart'), 
    //productDetail: (req, res) => res.render('productDetail'), 
    
    products: (req,res) => {
            db.Product.findAll()  
    .then(function(products){
        res.render("products", {products: products})})},
      //  res.render('products', {products: products}),
    
    productCreate: function(req,res){
        let promProduct_category = db.Product_category.findAll();

        Promise
        .all([promProduct_category])
        .then(([allProduct_category]) => {
            return res.render('productCreate', {allProduct_category})})
        .catch(error => res.send(error))
    } ,
        

        // create: function (req,res) {
        //     Movies
        //     .create(
        //         {
        //             title: req.body.title,
        //             rating: req.body.rating,
        //             awards: req.body.awards,
        //             release_date: req.body.release_date,
        //             length: req.body.length,
        //             genre_id: req.body.genre_id
        //         }
        //     )
        //     .then(()=> {
        //         return res.redirect('/movies')})            
        //     .catch(error => res.send(error))
        // },


    newProduct: (req,res) => {
        let newProduct = {
            id: products[products.length-1].id +1,
            ...req.body,
            image:req.file?req.file.filename:'img/default.png',
            category: req.body.category
        };
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.render('products', {'products': products});
    } ,

    productName:(req,res) => {
        let productId = req.params.id;
        let promProduct = db.Product.findByPk(productId,{include: ['product_categories']});
        let promProduct_category = db.Product_category.findAll();
        Promise
        .all([promProduct, promProduct_category])
        .then(([Product, allProduct_category]) => {
            return res.render('productDetail', {Product,allProduct_category})})
        .catch(error => res.send(error))

        // db.Product.findByPk(req.params.id) 
        
        // .then(function(products){
        // res.render( 'productDetail', {'products': products})
        // })
        
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
