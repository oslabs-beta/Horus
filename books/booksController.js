const booksModel = require('./booksModel.js');
const booksController = {};
let getBooksResult;

// controller Creates Books
booksController.createBook = (sampleAdd, res, next) => {
    booksModel.create(sampleAdd,(err, result) => {
      if (err) {
        console.log(`This is the error I am getting back ${err}`);
        return res.send(404).json(err);
      }
    });
};


// controller deletes book
booksController.deleteBook = (req, res, next) => {
  const { id } = req;
  booksModel.findOneAndDelete({ id: id }, (error, result) => {
    if (error) {
      console.log(`Deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
  });
};


// controller gets a book in the book db
booksController.getBooks = (callback) => {
  booksModel.find({}, (err, result) => {
    if (err) {
      console.log('Book retrieval was not successful', err);
      return res.status(404).json(err);
    }
    call.data = result;
    console.log('APP.LOCALS.GETBOOKS FROM CONTROLLER: ', call.data)
    // console.log('result from get books db. controller:',result[0])
    // getBooksResult = result;
    // console.log('getBooksResult:',getBooksResult[1])
    // return next();

    callback(
      null,
      {
        RESULT: result
      }
    )

  });
};














module.exports.getBooksResult = getBooksResult;
module.exports = booksController;