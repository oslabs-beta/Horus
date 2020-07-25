const customersModel = require("./customersModel.js");
const customersController = {};
const path = require('path');
const customersControllerStub = require(path.join(__dirname, "../stubs/customersControllerStub.js"));
const grpc = require('grpc')
// const customersControllerStub = require("../stubs/customersControllerStub.js");

const horusTracer = require("../horus/horus.js");

let ht = new horusTracer("customers");

// Controller create customer
customersController.createCustomer = (sampleAdd) => {
  customersModel.create(sampleAdd, (error, result) => {
    if (error) console.log('there was an error writing to the mongo db from the createCustomer controller function  :  ', error);
  });
};

//**********/may have to add id for customer in protofile

// controller deletes customer
customersController.deleteCustomer = (id) => {
  customersModel.findOneAndDelete({ id: id }, (error, result) => {
    if (error) {
      console.log('there was an error writing to the mongo db from the deleteCustomer controller function  :  ', error);
    }
  });
};

// controller gets all customers in the book db
customersController.getCustomers = (callback, call) => {
  customersModel.find({}, (err, result) => {

    function gettingBooks(error, data) {

      ht.end();
      if (error) console.log("sorry, there was an error", error);      

      const customerObj = {};
      customerObj.id = result[0].id;
      customerObj.name = result[0].name;
      customerObj.age = result[0].age;
      customerObj.address = result[0].address;
      customerObj.favBook = data;

      callback(null, {
        names: [
          {
            id: result[0].id,
            name: result[0].name,
            age: result[0].age,
            address: result[0].address,
            favBook: data,
          },
        ],
      });
    }
    const favBookId = {id: 100};
    ht.start('books', call);
    customersControllerStub
      .GetBookByID(favBookId, gettingBooks)
      .on("metadata", (metadata) => {
        ht.grabTrace(metadata.get('response')[0])
      });
  });
};

module.exports = customersController;
