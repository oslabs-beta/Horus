const PROTO_PATH = '../protos/customer.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

//packageDefinition loads the protofile and defines some settings of how we want our data to load.
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

/*
Load a gRPC package definition as a gRPC object hierarchy

@param packageDef — The package definition object

@return — The resulting gRPC object
*/
const customersProto = grpc.loadPackageDefinition(packageDefinition);

//uuid generates a unique identifier 
//use this to generate id's for items in the database
const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

server.addService(customersProto.CustomerService.service, {
  CreateCustomer: (call, callback) => {
    console.log('call to CreateCustomer')

    //This is where we will put the logic to create a customer in the database

    callback(
      null,
      {
        name: 'name',
        age: 'age',
        address: 'address',
      }
    );
  },
  
});