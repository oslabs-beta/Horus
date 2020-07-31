const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const controller = require('./customersController.js');

const PROTO_PATH = path.join(__dirname, '../protos/customers.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(customersProto.CustomersService.service, {
  CreateCustomer: async (call, callback) => {

    console.log('call to create customer')

    const result = await controller.createCustomer(call.request);

    console.log('result ', result)

    const meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    if (result === 'error') { 
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error writing to the database',
      })
    }
    callback(null, {
      custId: result.custId,
      name: result.name,
      age: result.age,
      address: result.address,
      favBookId: result.favBookId,
    });
  },
  GetCustomer: (call, callback) => {
    console.log("call to GetCustomer");
    controller.getCustomer(callback, call);
  },
  DeleteCustomer: (call, callback) => {
    console.log("call to DeleteCustomer");

    let meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    //logic to delete customer from Database
    controller.deleteCustomer(call.request.custId);

    callback(null, {});
  },
}); 


server.bind("127.0.0.1:6000", grpc.ServerCredentials.createInsecure());
console.log("customerServer.js running at http://127.0.0.1:6000");

console.log("call from customer server");

server.start();
