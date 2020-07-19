const bookModel = require('./bookModel');


BookController.createBook = (req, res, next) => {
    const {
      title, author, numberOfPages, publisher,
    } = req.body;
    bookModel.create({
      title, author, numberOfPages, publisher,
    }, (err, result) => {
      if (err) {
        console.log(`This is the error I am getting back ${err}`);
        return res.send(404).json(err);
      }
  
      res.locals.createBook = result;
      return next();
    });
  };



module.exports = bookController;