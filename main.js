const booksStub = require('./stubs/booksStub.js');
const customersStub = require('./stubs/customersStub.js');
const HorusTracer = require('./horus/horus.js');

const book = {
  title: "ITttttt",
  author: "Stephen King",
  numberOfPages: 666,
  publisher: "Random House",
  bookId: 200,
};

const bookId = {
  bookId: 200
}

const customer = {
  custId: 123,
  name: 'Lily',
  age: 23,
  address: 'Blablabla',
  favBookId: 200,
};

const customerId = {
  custId: 123
}

const ht = new HorusTracer('main');
// ht.neo4jInit('neo4j', 'password');

function CreateCustomer() {
  ht.start('customers');
  customersStub.CreateCustomer(customer, (error, response) => {
    if (error) console.log('ERROR from the CreateCustomer stub : ', error);
    ht.end();
  }).on('metadata', (metadata) => {
      ht.grabTrace(metadata.get('response')[0]);
  });
}

function GetCustomer() {
  ht.start('customers');
  customersStub.GetCustomer(customerId, (error, response) => {
      if (error) console.log("there was an error ", error);
      ht.end();
      //ht.writeToFile();
    })
    .on("metadata", (metadata) => {
      ht.grabTrace(metadata.get("response")[0]);
    });
}

function DeleteCustomer() {
  ht.start('customers')
  customersStub.DeleteCustomer(customerId, (error, response) => {
    if (error) console.log("there was an error ", error);
    ht.end();
    ht.displayRequests();
    ht.writeToFile();
  }).on('metadata', (metadata) => {
    ht.grabTrace(metadata.get('response')[0]);
  });
}

function CreateBook () {
  ht.start('books')
  booksStub.CreateBook(book, (error, response) => {
    if (error) console.log("there was an error ", error);
    ht.end();
    ht.displayRequests();
    ht.writeToFile();
  }).on('metadata', (metadata) => {
    ht.grabTrace(metadata.get('response')[0]);
  });
}

function DeleteBook () {
  ht.start('books')
  booksStub.DeleteBook(bookId, (error, response) => {
    if (error) console.log("there was an error ", error);
    ht.end();
    ht.displayRequests();
    ht.writeToFile();
  }).on('metadata', (metadata) => {
    ht.grabTrace(metadata.get('response')[0]);
  });
}

function GetBooks () {
  ht.start('books')
  booksStub.GetBooks({}, (error, response) => {
    if (error) console.log("there was an error ", error);
    ht.end();
    ht.displayRequests();
    ht.writeToFile();
  }).on('metadata', (metadata) => {
    ht.grabTrace(metadata.get('response')[0]);
  });
}

function GetBookByID() {
  ht.start('books')
  booksStub.GetBooks(bookId, (error, response) => {
    if (error) console.log("there was an error ", error);
    console.log('logging response inside getBookByID', response);
    ht.end();
    ht.displayRequests();
    ht.writeToFile();
  }).on('metadata', (metadata) => {
    ht.grabTrace(metadata.get('response')[0]);
  });
}

CreateCustomer();