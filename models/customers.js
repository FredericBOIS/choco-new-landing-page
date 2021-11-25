'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Customers.init({
    restaurantName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    BuyerID: DataTypes.STRING,
    status: DataTypes.STRING,
    status_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'customers'
  });
  return Customers;
};