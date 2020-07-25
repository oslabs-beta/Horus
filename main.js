const booksStub = require("./stubs/booksStub.js");
const customersStub = require("./stubs/customersStub.js");
// const grpc = require("grpc");
const horusTracer = require("./horus/horus.js");

const book = {
  title: "ITttttt",
  author: "Stephen King",
  numberOfPages: 666,
  publisher: "Random House",
  id: 200,
};

const customer = {
  id: "123",
  name: "Lily",
  age: 23,
  address: "Blablabla",
  favBookId: 100
};

let ht = new horusTracer("main");


function getCustomers() {
  ht.start("customers");
  customersStub.GetCustomers({}, (error, response) => {
      if (error) console.log("there was an error ", error);
      ht.end();
      ht.displayRequests();
    })
    .on("metadata", (metadata) => {
      ht.grabTrace(metadata.get("response")[0]);
    });
}

function createCustomer () {
  customersStub.CreateCustomer(customer, (error, response) => {
    if (error) console.log('there was an error ', error)

  }).on("metadata", (metadata) => {
    
  });
}


createCustomer()
