const DB = require("../../../database/models");



module.exports = {
    list: (req, res) =>{
        DB.Product
            .findAll()
            .then(products => {
                return res.status(200).json({
                    total:products.length,
                    data: products,
                    status: 200
                })
            })
    },

    games : (req, res) =>{
        DB.Product
            .findAll({
                where: {
                    product_category : 1
                }
              })
            .then(products => {
                return res.status(200).json({
                    total:products.length,
                    data: products,
                    status: 200
                })
            })
    },
    software : (req, res) =>{
        DB.Product
            .findAll({
                where: {
                    product_category : 2
                }
              })
            .then(products => {
                return res.status(200).json({
                    total:products.length,
                    data: products,
                    status: 200
                })
            })
    }
}