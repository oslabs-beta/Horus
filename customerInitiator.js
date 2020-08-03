//initiator.js files are a way for us to use these functions without using the browser on the front end.
const customerInitiator = {};
const customerStub = require("./stubs/customersStub.js");
const { resolve } = require("path");

customerInitiator.createCustomer = (req, res, next) => {
  console.log('Inside of create customer in customerInitiator')
  console.log('REQ INSIDE CUST INITIATOR: ', req)
  const customer = {
    custId: req.body.custId,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    favBookId: req.body.favBookId
  };

  const callback = (error, data) => {
    console.log('call to callback')
    console.log('DATA: ', data)
    res.locals.customers = data
    if (error) console.log('sorry, there was an error', error)
    return next()
  }
  customerStub.CreateCustomer(customer, callback)
}

customerInitiator.getCustomer = (req, res, next) => {
  const callback = (error, data) => {
    console.log('Getting Customer from customer initiator')
    res.locals.customers = data
    if (error) console.log('sorry, there was in error: ', error)
    return next()
  }
  customerStub.GetCustomer({custId: 1}, callback)
}

customerInitiator.deleteCustomer = (req, res, next) => {
  console.log('entered deleteCustomer in customer initiator.')
  console.log('REQ.PARAMS: ', req.params)
  custId = {custId: req.params.custId}
  const callback = (error, data) => {
    console.log('Data coming back from deleteCustomer? : ', data)
    if (error) console.log('sorry, there was an error', error)
    return next()
  }
  customerStub.DeleteCustomer(custId, callback)
}

const callback = (error, data) => {
  console.log('call to callback')
  if (error) console.log('sorry, there was an error', error)

  console.log('logging data.names ', data.names)
  console.log('logging favorite books ', data.names[0].favBook)
}

const getData = (functionName) => {
  if (functionName === 'CreateCustomer') return customer;
  else if (functionName === 'GetCustomers') return {};
  else if (functionName === 'DeleteCustomer') return custId;
}

module.exports = customerInitiator;