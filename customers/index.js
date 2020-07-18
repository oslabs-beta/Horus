const client = require("./customersServer.js");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/createBook', (req, res) => {
  client.CreateBook({
    title: 'Harry Potter', 
    author: 'J.K Rowlings',
    pages: 100,
    publisher: 'Random House',
    id: 1
  }, (error, data) => {
    console.log('callback from client.Create')
    console.log('response data', data) 
    res.send({data: data})
  })
});

app.listen(3000, (req, res) => {
  console.log('listening on port 3000')
})