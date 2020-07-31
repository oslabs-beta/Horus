const customersModel = require("./customersModel.js");
const customersController = {};
const path = require('path');
const booksStub = require(path.join(__dirname, "../stubs/booksStub.js"));
const grpc = require('grpc')

const horusTracer = require("../horus/horus.js");

const ht = new horusTracer("customers");

function GetBookIdAsPromise (bookId) {
  return new Promise((resolve, reject) => {
    booksStub.GetBookByID(bookId, (error, response) => {
      if (error) resolve(error);
      resolve(response);
    })
  })
}

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
  const customer = await customersModel.findOne(custId)
    .catch((error) => {
      console.log('ERROR from getCustomer controller : ', error)
      return 'error';
    })

  const book = await GetBookIdAsPromise({ bookId: customer.favBookId });

  const customerWithFavBook = {};
  customerWithFavBook.custId = customer.custId;
  customerWithFavBook.name = customer.name;
  customerWithFavBook.age = customer.age;
  customerWithFavBook.address = customer.address;
  customerWithFavBook.favBook = book;

  return customerWithFavBook;
}

module.exports = customersController;
