const PROTO_PATH = '../protos/books.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const controller = require('./booksController.js');
const getBooksResult = controller.getBooksResult
const app = express();
app.use(express.json());

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})



const booksProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

  
//creating createbook variable function to call
// const serverSample = {
//   title: 'blank', 
//   author: ' King',
//   numberOfPages: 666,
//   publisher: 'Random House',
//   id: 1
// }

// controller.createBook(serverSample)


server.addService(booksProto.BooksService.service, {
  CreateBook: (call, callback) => {
    console.log('call to CreateBook')
    console.log('CALL DATA: ', call)
    //sample will take the call information from the client(stub)
    const sampleAdd= {
      title: call.request.title, 
      author: call.request.author,
      numberOfPages: call.request.numberOfPages,
      publisher: call.request.publisher,
      id: call.request.id
    }
//this actually sends data to booksController.
   controller.createBook(sampleAdd);
    

//Whatever gets passed in as the second argument will be sent back to the client.
    callback(
      null,
      //bookmodel.create
      {
        title: `completed for: ${call.request.title}`, 
        author: `completed for: ${call.request.author}`,
        numberOfPages:`completed for: ${call.request.numberOfPages}` ,
        publisher: `completed for: ${call.request.publisher}`,
        id: `completed for: ${call.request.id}`
      }
    );
  },
  GetBooks: (call, callback) => {
    console.log('call to GetBooks');
    console.log('RES.LOCALS IN BOOKSSERVER: ', call)
 
// async function run(){
//   await controller.getBooks();
//   await (() =>console.log('getBooksResult made it to the server: ', getBooksResult))
// }

// run()
    // read from database

    controller.getBooks(callback);

    callback(
      null,
      {
        //     is [res.locals.getBooks] correct???
        //             | | |
        //             V V V
        BookList: '[res.locals.getBooks]'
      }
         
    )
  },
  DeleteBook: (call, callback) => {
    console.log('call to DeleteBook');
    console.log('DELETE CALL DATA: ', call)

    //sample will take the call information from the client(stub)
    const sampleAdd= {
      id: call.request.id
    }
  //this actually sends data to booksController.
    controller.deleteBook(sampleAdd);

    // delete from database

    callback(
      null,
      {
        message: 'DELETED'
      }
    )
  }
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");

console.log('call from books server')

server.start();