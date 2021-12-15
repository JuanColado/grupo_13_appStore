module.exports = (sequelize, dataTypes) => {
    let alias = "users_categories";
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
      tableName: "users_categories",
      timestamps: false,
    };
    const user_category = sequelize.define(alias, cols, config);
    return user_category;
  };
  