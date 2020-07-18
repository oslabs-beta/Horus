const PROTO_PATH = '../protos/books.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

const booksProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

server.addService(booksProto.BooksService.service, {
  CreateBook: (book, callback) => {
    callback(
      null,
      {
        title: "title1", 
        author:"author1",
        pages: 100,
        publisher: 'Random House',
        id: 0
      }
    );
  }
});
//  could this be local host?
server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");
server.start();