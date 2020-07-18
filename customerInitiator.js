const customerStub = require("./stubs/customerStub.js");

console.log('process.env vars', process.env.function);

const customer = {};

const id;

const callback = (error, data) => {
  console.log('call to callback')
  if (error) console.log('sorry, there was an error', error)
  else console.log('data', data)
}
const getData = (functionName) => {
  if (functionName === 'CreateCustomer') return book
  else if (functionName === 'GetCustomers') return {}
  else if (functionName === 'DeleteCustomer') return id;
}

function main (functionName) { 
  customerStub[functionName](getData(functionName), callback);
}

main(process.env.function);