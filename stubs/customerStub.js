const PROTO_PATH = "./protos/customer.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
  });

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;

// potential issues to fix 1) making localhost port dynamic 2) docker containerization may cause conflict

const client = new CustomerService (
  "localhost:58975",
  grpc.credentials.createInsecure()
);

module.exports = client;