module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    product_name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    product_description: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    product_image: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    product_price: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    product_category: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };
  const Product = sequelize.define(alias, cols, config);
  Product.associate = function(models) {
    Product.belongsTo(models.Product_category, {
      as: "product_categories",
      foreignKey: "product_category"
    });
  };

 
  return Product;
};
