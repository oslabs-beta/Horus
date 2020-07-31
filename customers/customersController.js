const customersModel = require("./customersModel.js");
const customersController = {};
const path = require('path');
const booksStub = require(path.join(__dirname, "../stubs/booksStub.js"));
const grpc = require('grpc')

const horusTracer = require("../horus/horus.js");

const ht = new horusTracer("customers");

customersController.createCustomer =  async (customer) => {
  return await customersModel.create(customer)
    .then((response) => response)
    .catch((error) => {
      console.log('ERROR from createCustomer controller : ', error);
      return 'error';
    })
};

//**********/may have to add id for customer in protofile

// controller deletes customer
customersController.deleteCustomer = (custId) => {
  customersModel.findOneAndDelete({ custId: custId }, (error, result) => {
    if (error) {
      console.log('there was an error writing to the mongo db from the deleteCustomer controller function  :  ', error);
    }
  });
};

// controller gets all customers in the book db
customersController.getCustomer = (callback, call) => {

  customersModel.findOne(call.request, (err, result) => {

    //console.log('result ', result)

    function gettingBooks(error, data) {
      ht.end();
      ht.writeToFile();
      if (error) console.log("sorry, there was an error", error);      

      const customerObj = {};
      customerObj.custId = result.custId;
      customerObj.name = result.name;
      customerObj.age = result.age;
      customerObj.address = result.address;
      customerObj.favBook = data;

      callback(
        null, 
        customerObj
      );
    }
    console.log('book id ', {bookId: result.favBookId})

    ht.start('books', call);
    booksStub
      .GetBookByID({ bookId: result.favBookId }, gettingBooks)
      .on("metadata", (metadata) => {
        ht.grabTrace(metadata.get('response')[0])
      });
  });
};

module.exports = customersController;
