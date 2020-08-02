const booksStub = require('./stubs/booksStub.js');
const customersStub = require('./stubs/customersStub.js');

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

function CreateBook () {
  booksStub.CreateBook(book, (error, response) => {
    console.log('main.js CreateBook response ', response);
  })
}

function DeleteBook () {
  booksStub.DeleteBook(bookId, (error, response) => {
    console.log('main.js DeleteBook response ', response);
  })
}

function GetBookById() {
  booksStub.DeleteBook(bookId, (error, response) => {
    console.log('main.js GetBookById response ', response);
  })
}

GetBookById();