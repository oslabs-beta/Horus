const path = require('path');
const express = require('express');
const app = express();
const customerRouter = require('./routes/customersRouter.js')
const booksRouter = require('./routes/booksRouter.js')

app.use(express.json())

app.use('/customers', customerRouter);

app.use('/books', booksRouter);

app.use('/build', express.static(path.join(__dirname, '../../../mockAppWithHorus/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((req, res) => {
  console.log("Unknown route. Try another route.");
  return res.status(404)
});

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

app.listen(3000, () => console.log('Listening on port 3000'));