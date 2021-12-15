module.exports = (sequelize, dataTypes) => {
    let alias = "users";
    let cols = {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      total_price: {
        allowNull: false,
        type: dataTypes.INTEGER,
      },
      users_id: {
        allowNull: false,
        type: dataTypes.INTEGER,
      },
      products_id: {
        allowNull: false,
        type: dataTypes.INTEGER,
      }
    };
    let config = {
      tableName: "users",
      timestamps: false,
    };
    const user = sequelize.define(alias, cols, config);
    return user;
  };
  