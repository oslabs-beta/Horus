const customersModel = require('./customersModel.js');
const customersController = {};
const bookStub1 = require('../stubs/booksStub1.js')


// Controller create customer
customersController.createCustomer = (sampleAdd, res, next) => {
    customersModel.create(sampleAdd, (error, result) => {
      if (error) {
        console.log(`Customer could not be created in database ${error}`);
        return res.status(404).json(error);
      }

    });
  };

//**********/may have to add id for customer in protofile

  // controller deletes customer
customersController.deleteCustomer = (sampleDelete, res, next) => {
    console.log(sampleDelete)
    const { id } = sampleDelete;
    customersModel.findOneAndDelete({ id: id }, (error, result) => {
      if (error) {
        console.log(`Deletion was not successful ${error}`);
        return res.status(404).json(error);
      }
    });
  };


  // controller gets all customers in the book db
customersController.getCustomers = (callback) => {
  //grab customer's favorite book from booksServer
  

  // const id = sampleID;
  // const getBookCB = (error, data) => {
  //   console.log('call to booksServer from customersController')
  //   if (error) console.log('sorry, there was an error', error)
  //   else console.log('data coming back to customersController from booksServer: ', data)
  // }
  
  // const getData = (functionName) => {
  // if (functionName === 'GetBookByID') return id
  // }
  // function main (functionName) { 
  //   bookStub[functionName](getData(functionName), getBookCB);
  // }
  // main();

    customersModel.find({},(err, result) => {
      if (err) {
        console.log('customer retrieval was not successful', err);
        console.log('RESULT[I]: ',result[i])
        return res.status(404).json(err);
      }
  
      const arr = [];
      for(let i = 0; i < result.length; i++){
        let id = result[i].favBookId;
        if(id === undefined){id = 100}
        const gettingBooks = (error, data) => {
        console.log('call to booksServer from customersController')
        if (error) console.log('sorry, there was an error', error)
        else console.log('data coming back to customersController from booksServer: ', data)
      }
  
        const getData = () => {
          console.log('ID IN GETDATA IN CUSTOMERSCONTROLLER: ', id)
          return id;
      }
        function main () { 
        bookStub1.GetBookByID(getData(), gettingBooks);
      }
       main();

        arr.push({
          id: result[i].id,
          name: result[i].name, 
          age: result[i].age,
          address: result[i].address,
          favBook: {
            title: 'hi',
            author: 'hi',
            numberOfPages: 100,
            publisher: 'hi',
            id: 5
          }
        })            
      }
  //***********IMPORTANT: MAKE SURE WHEN YOU'RE SENDING DATA BACK TO THE CLIENT THAT YOU ARE FOLLOWING THE PROTOFILE FORMAT EXACTLY!!!
  
      callback(
        null,
        {
          names: arr
        }
      )
    });
  };

  module.exports = customersController;