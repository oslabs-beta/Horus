const path = require('path');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const controller = require("./booksController.js");

const PROTO_PATH = path.join(__dirname, '../protos/books.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const booksProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(booksProto.BooksService.service, {
  CreateBook: async (call, callback) => {
    console.log("call to CreateBook");

    const result = await controller.createBook(call.request);

    const meta = new grpc.Metadata();
    meta.add("response", "none");
    call.sendMetadata(meta);

    callback(
      null,
      {
        title: `completed for: ${call.request.title}`,
        author: `completed for: ${call.request.author}`,
        numberOfPages: `completed for: ${call.request.numberOfPages}`,
        publisher: `completed for: ${call.request.publisher}`,
        bookId: `completed for: ${call.request.bookId}`,
      }
    );
  },
  GetBooks: (call, callback) => {
    console.log("call to GetBooks");
    // read from database
    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    controller.getBooks(callback);
  },
  GetBookByID: (call, callback) => {
    console.log("call to GetBookByID");

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    controller.getBookByID(call.request, callback);
  },
  DeleteBook: (call, callback) => {
    //sample will take the call information from the client(stub)
    const bookID = {
      bookId: call.request.bookId,
    };

    //this actually sends data to booksController.
    controller.deleteBook(bookID);

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    // delete from database
    callback(null, { message: "DELETED" });
  },
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");

console.log("call from books server");

server.start();
