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
    const result = await controller.createBook(call.request);

    if (result === 'error') {
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error writing to the database',
      });
    }

    const meta = new grpc.Metadata();
    meta.add("response", "none");
    call.sendMetadata(meta);

    callback(
      null,
      {
        title: result.title,
        author: result.author,
        numberOfPages: result.numberOfPages,
        publisher: result.publisher,
        bookId: result.bookId,
      }
    );
  },
  DeleteBook: async (call, callback) => {
    const result = controller.deleteBook(call.request);

    if (result === 'error') {
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error deleting from the database',
      });
    }

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    callback(null, {});
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

});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("booksServer.js running at http://127.0.0.1:30043");

console.log("call from books server");

server.start();
