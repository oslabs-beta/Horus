const booksModel = require('./booksModel.js');
const booksController = {};

booksController.createBook = async (book) => {
  return await booksModel.create(book)
    .then((response) => response)
    .catch((error) => {
      console.log('ERROR from createBook controller : ', error);
      return 'error';
    })
};

booksController.deleteBook = async (bookId) => {
  return await booksModel.findOneAndDelete(bookId)
    .then((response) => response)
    .catch((error) => {
      console.log('ERROR from deleteBook controller : ', error);
      return 'error';
    })
};

booksController.getBookByID = (sampleID, callback) => {
  console.log('sample id ', sampleID);
  booksModel.findOne(sampleID, (error, result) => {
    if (error) console.log('there was an error from the books controller get books by id function  :  ', error);
    console.log("response obj ", result);
    callback(
      null,
      {
        title: result.title,
        author: result.author,
        numberOfPages: result.numberOfPages,
        publisher: result.publisher,
        bookId: result.bookId
      }
    )
  })
}

booksController.getBooks = (callback) => {
  booksModel.find({},(error, result) => {
    if (error) console.log('there was an error from the books controller get book function  :  ', error);
    console.log('received resposne from mongodb results ', result)
    const arr = [];
    for( let i = 0; i < result.length; i++){
      arr.push({
        title: result[i].title, 
        author: result[i].author,
        numberOfPages: result[i].numberOfPages,
        publisher: result[i].publisher,
        bookId: result[i].bookId
      })            
    }
    callback(
      null,
      {
        books: arr
      }
    )
  });
};

module.exports = booksController;