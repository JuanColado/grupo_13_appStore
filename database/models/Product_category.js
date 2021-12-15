module.exports = (sequelize, dataTypes) => {
    let alias = "Product_category";
    let cols = {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      category_name: {
        allowNull: false,
        type: dataTypes.STRING,
      }
    };
    let config = {
      tableName: "products_categories",
      timestamps: false,
    };
    const Product_category = sequelize.define(alias, cols, config);
    Product_category.associate = function(models){
      Product_category.hasMany(models.Product, {
        as: "Products",
        foreignKey: "product_category" 
      })
    }
    return Product_category;
  };
  