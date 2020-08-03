const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const HorusClientWrapper = require("../horusClientWrapper.js");
const PROTO_PATH = path.join(__dirname, "../protos/books.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const BooksService = grpc.loadPackageDefinition(packageDefinition).BooksService;

const client = new BooksService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

// The Client Wrapper "wraps" all the methods within the client object
// The first parameter is the actual gRPC client object, the second is the service, and the third is the output file
// Your invocations of the client at whereever you export this module to can remain entirely the same
const ClientWrapper = new HorusClientWrapper(client, BooksService, "books.txt");

// Export the Client Wrapper rather than the server object
module.exports = ClientWrapper;
