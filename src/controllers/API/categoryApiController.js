const DB = require("../../../database/models");



module.exports = {
    list: (req, res) =>{
        DB.Product_category
            .findAll()
            .then(category => {
                return res.json({
                    data: category
                })
            })
    }
}