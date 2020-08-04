const booksStub = require("./stubs/booksStub.js");
const customersStub = require("./stubs/customersStub.js");

const book = {
  title: "title7",
  author: "Stephen King",
  numberOfPages: 777,
  publisher: "Random House",
  bookId: 23,
};

const bookId = {
  bookId: 200,
};

const customer = {
  custId: 123,
  name: "Lily",
  age: 23,
  address: "Blablabla",
  favBookId: 200,
};

const customerId = {
  custId: 123,
};

function CreateBook() {
  booksStub.CreateBook(book, (error, response) => {
    console.log("main.js CreateBook response ", response);
  });
}

function DeleteBook() {
  booksStub.DeleteBook(bookId, (error, response) => {
    console.log("main.js DeleteBook response ", response);
  });
}

function GetBookByID() {
  booksStub.GetBookByID(bookId, (error, response) => {
    console.log("main.js GetBookById response ", response);
  });
}

function GetBooks() {
  booksStub.GetBooks(bookId, (error, response) => {
    console.log("main.js GetBooks response ", response);
  });
}

function CreateCustomer() {
  customersStub.CreateCustomer(customer, (error, response) => {
    console.log("main.js CreateCustomer response ", response);
  });
}

function DeleteCustomer() {
  customersStub.DeleteCustomer(customer, (error, response) => {
    console.log("main.js DeleteCustomer response ", response);
  });
}

function GetCustomer() {
  customersStub.GetCustomer(customer, (error, response) => {
    console.log("main.js GetCustomer response ", response);
  });
}

//CreateBook();
// DeleteBook();
// GetBookByID();
// GetBooks();
// CreateCustomer();
// DeleteCustomer();
// INTRA-SERVICE! -> can't save to DB (fix trace field - nested)
// GetCustomer();
