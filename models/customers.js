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
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    street_number: DataTypes.STRING,
    company: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    industry: DataTypes.STRING,
    BuyerID: DataTypes.STRING,
    status: DataTypes.STRING,
    status_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'customers'
  });
  return Customers;
};