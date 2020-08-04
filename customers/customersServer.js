const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const controller = require("./customersController.js");
const HorusServerWrapper = require("../HorusServerWrapper.js");
const booksStub = require(path.join(__dirname, "../stubs/booksStub.js"));

const PROTO_PATH = path.join(__dirname, "../protos/customers.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

function GetBookIdAsPromise(bookId, server) {
  return new Promise((resolve, reject) => {
    booksStub.GetBookByID(bookId, (error, response) => {
      if (error) resolve("error");
      booksStub.makeHandShakeWithServer(server, "GetBookByID");
      resolve({ book: response });
    });
  });
}

// The Horus Server Wrapper "wraps" each server method passed in
// Replace server.addService({ .. methods}) with Const ServerWrapper = new HorusServerWrapper (serverObject, service, {..methods})
// Your preexisting methods can remain entirely the same

const ServerWrapper = new HorusServerWrapper(
  server,
  customersProto.CustomersService.service,
  {
    CreateCustomer: async (call, callback) => {
      const result = await controller.createCustomer(call.request);

      if (result === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error writing to the database",
        });
      }
      callback(null, {
        custId: result.custId,
        name: result.name,
        age: result.age,
        address: result.address,
        favBookId: result.favBookId,
      });
    },
    DeleteCustomer: async (call, callback) => {
      const result = await controller.deleteCustomer(call.request.custId);

      if (result === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error deleting from the database",
        });
      }
      callback(null, {});
    },
    GetCustomer: async (call, callback) => {
      const customer = await controller.getCustomer(call.request);
      if (customer === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error querying the database",
        });
      }

      const responseFromGetBookById = await GetBookIdAsPromise(
        { bookId: customer.favBookId },
        ServerWrapper
      );

      if (responseFromGetBookById === "error") {
        return callback({
          code: grpc.status.STATUS_UNKNOWN,
          message: "There was an error making an intraservice request to books",
        });
      }

      const customerWithFavBook = {};
      customerWithFavBook.custId = customer.custId;
      customerWithFavBook.name = customer.name;
      customerWithFavBook.age = customer.age;
      customerWithFavBook.address = customer.address;
      customerWithFavBook.favBook = responseFromGetBookById.book;

      callback(null, customerWithFavBook);
    },
  }
);

server.bind("127.0.0.1:40043", grpc.ServerCredentials.createInsecure());
console.log("customerServer.js running at http://127.0.0.1:40043");
console.log("call from customer server");

server.start();
