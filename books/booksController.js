const booksModel = require('./booksModel.js');
const booksController = {};


// controller Creates Books
booksController.createBook = (book) => {
    booksModel.create(book,(error, result) => {
      if (error) console.log('there was an error from the books controller create book function  :  ', error);
    });
};


// controller deletes book
booksController.deleteBook = (bookID, res, next) => {
  const { id } = bookID;
  booksModel.findOneAndDelete({ id: id }, (error, result) => {
    if (error) console.log('there was an error from the books controller delete book function  :  ', error);
  });
};

booksController.getBookByID = (sampleID, callback, res, next) => {
  console.log('entered booksController.getBookByID')
  //Double check if the findOne syntax is correct
  const { id } = sampleID;
  console.log('ID GETTING PASSED TO BOOKSCONTROLLER: ', sampleID)
  booksModel.findOne({id: id}, (error, result) => {
    if (error) {
      console.log(`Unable to find book by id ${error}`);
      return res.status(404).json(error)
    }
    callback(
      null,
      {
        title: result.title,
        author: result.author,
        numberOfPages: result.numberOfPages,
        publisher: result.publisher,
        id: result.id
      }
    )
  })
}

// controller gets all books in the book db
booksController.getBooks = (callback) => {
  booksModel.find({},(err, result) => {
    if (err) {
      console.log('Book retrieval was not successful', err);
      return res.status(404).json(err);
    }

    const arr = [];
    for( let i=0; i<result.length;i++){
      arr.push({
        title: result[i].title, 
        author: result[i].author,
        numberOfPages: result[i].numberOfPages,
        publisher: result[i].publisher,
        id: result[i].id
      })            
    }
//***********IMPORTANT: MAKE SURE WHEN YOU'RE SENDING DATA BACK TO THE CLIENT THAT YOU ARE FOLLOWING THE PROTOFILE FORMAT EXACTLY!!!

    callback(
      null,
      {
        books: arr
      }
    )
  });
};

module.exports = booksController;