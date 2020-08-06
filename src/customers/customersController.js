const customersModel = require("./customersModel.js");
const customersController = {};
const path = require('path');

customersController.createCustomer =  async (customer) => {
  return await customersModel.create(customer)
    .then((response) => response)
    .catch((error) => {
      console.log('ERROR from createCustomer controller : ', error);
      return 'error';
    })
};

customersController.deleteCustomer = async (custId) => {
  return await customersModel.findOneAndDelete(custId)
    .then((response) => response)
    .catch((error) => {
      console.log('ERROR from deleteCustomer controller : ', error);
      return 'error';
    })
};

customersController.getCustomer = async (custId) => {
  return await customersModel.findOne(custId)
    .catch((error) => {
      console.log('ERROR from getCustomer controller : ', error)
      return 'error';
    })
}

module.exports = customersController;
