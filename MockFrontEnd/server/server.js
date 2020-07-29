const path = require('path');
const express = require('express');
const app = express();
const customerRouter = require('./routes/customersRouter.js')
const booksRouter = require('./routes/booksRouter.js')

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

app.use('/customers', customerRouter);

app.use('/books', booksRouter);

app.listen(3000, () => console.log('Listening on port 3000'));