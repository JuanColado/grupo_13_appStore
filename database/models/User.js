module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    first_name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    users_category: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };
  const user = sequelize.define(alias, cols, config);
  return user;
};
