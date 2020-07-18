const client = require("./customersService");

// const path = require("path");
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

function main () {
  client.Create({
      title: 'Harry Potter', author: 'J.K Rowlings',
      pages: 100,
      publisher: 'Random House',
      id: 1
  },
  (data) => {
   console.log('callback from client.Create')
   console.log('response data', data) 
  })
}

main();