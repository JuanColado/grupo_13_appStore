const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const fs = require("fs");
const { validationResult } = require("express-validator");
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../../database/models");
const { url } = require("inspector");

const productsController = {
  productCart: (req, res) => res.render("productCart"),
  //productDetail: (req, res) => res.render('productDetail'),

  products: (req, res) => {
    db.Product.findAll().then(function (products) {
      res.render("products", { products: products });
    });
  },
  //  res.render('products', {products: products}),

  productCreate: function (req, res) {
    let promProduct_category = db.Product_category.findAll();

    Promise.all([promProduct_category])
      .then(([allProduct_category]) => {
        return res.render("productCreate", { allProduct_category });
      })
      .catch((error) => res.send(error));
  },

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
  newProduct: function (req, res) {
    db.Product.create({
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_category: req.body.product_category,
      product_description: req.body.product_description,
      product_image: req.file ? req.file.filename : "img/default.png",
    })
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },

  productName: (req, res) => {
    let productId = req.params.id;
    let promProduct = db.Product.findByPk(productId, {
      include: ["product_categories"],
    });
    let promProduct_category = db.Product_category.findAll();
    Promise.all([promProduct, promProduct_category])
      .then(([Product, allProduct_category]) => {
        return res.render("productDetail", { Product, allProduct_category,  });
      })
      .catch((error) => res.send(error));

    // db.Product.findByPk(req.params.id)

    // .then(function(products){
    // res.render( 'productDetail', {'products': products})
    // })
  },

  editProduct: (req, res) => {
    let productId = req.params.id;
    let promProduct = db.Product.findByPk(productId, {
      include: ["product_categories"],
    });
    let promProduct_category = db.Product_category.findAll();
    Promise.all([promProduct, promProduct_category])
      .then(([Product, allProduct_category]) => {
        return res.render("editProduct", { Product, allProduct_category });
      })
      .catch((error) => res.send(error));
  },

  //  updateProduct:  (req,res) => {
  //     let id= req.params.id;
  //     let editProduct= products.find(item => item.id == id);

  //     editProduct={
  //         id: editProduct.id,
  //         ...req.body,
  //         image: "img/" + req.file.filename,
  //         category: req.body.category
  //     }
  //    let nuevoItem = products.map(item => {
  //        if(item.id == editProduct.id) {
  //            return item = {...editProduct};
  //        }
  //        return item
  //    })
  //    fs.writeFileSync(productsFilePath, JSON.stringify(nuevoItem, null, ' '));
  //     // res.render('producDetail', {'products': products});
  //     res.redirect('/');

  updateProduct: function (req, res) {
    let productId = req.params.id;
    db.Product.update(
      {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category,
        product_description: req.body.product_description,
        product_image: req.file?req.file.filename:'default.png',
      },
      {
        where: { id: productId },
      }
    )
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },

  deleteProduct: function (req, res) {
    let productId = req.params.id;
    db.Product.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
    // }
    // deleteProduct:  (req,res) => {
    //     let id= req.params.id;
    //     let productosFinales= products.filter(productosFinales => productosFinales.id !=id);
    //     fs.writeFileSync(productsFilePath, JSON.stringify(productosFinales));
    //     res.redirect('/');
    //     // res.render('products', {'productosFinales': productosFinales});
    // },
  },
};
module.exports = productsController;
