const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const controller = require("./booksController.js");
const HorusServerWrapper = require("../HorusServerWrapper.js");
const PROTO_PATH = path.join(__dirname, "../protos/books.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const booksProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// The Horus Server Wrapper "wraps" each server method passed in
// Replace server.addService({ .. methods}) with Const ServerWrapper = new HorusServerWrapper (serverObject, service, {..methods})
// Your preexisting methods can remain entirely the same
const ServerWrapper = new HorusServerWrapper(
  server,
  booksProto.BooksService.service,
  {
    CreateBook: async (call, callback) => {
      const result = await controller.createBook(call.request);

      if (result === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error writing to the database",
        });
      }
<<<<<<< HEAD
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
    
    // let sampleID = {bookId: call.request.bookId};

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    controller.getBookByID(call.request, callback);
  },
  DeleteBook: (call, callback) => {
    console.log('call to DeleteBook in booksServer')
    //sample will take the call information from the client(stub)
    const bookID = {
      bookId: call.request.bookId,
    };
    console.log('BOOK ID IN BOOKSSERVER: ', call.request.bookId)
    //this actually sends data to booksController.
    controller.deleteBook(bookID);

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);
=======

      callback(null, {
        title: result.title,
        author: result.author,
        numberOfPages: result.numberOfPages,
        publisher: result.publisher,
        bookId: result.bookId,
      });
    },
    DeleteBook: async (call, callback) => {
      const result = await controller.deleteBook(call.request);

      if (result === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error deleting from the database",
        });
      }
>>>>>>> 86b7722b95851f453f56302be1dd22209499d6a1

      callback(null, {});
    },
    GetBooks: async (call, callback) => {
      const result = await controller.getBooks();

      callback(null, { books: result });
    },
    GetBookByID: async (call, callback) => {
      const result = await controller.getBookByID(call.request, callback);

      if (result === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error reading from the database",
        });
      }
      callback(null, {
        title: result.title,
        author: result.author,
        numberOfPages: result.numberOfPages,
        publisher: result.publisher,
        bookId: result.bookId,
      });
    },
  }
);

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");

console.log("call from books server");

server.start();
