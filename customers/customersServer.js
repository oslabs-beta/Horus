const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const controller = require('./customersController.js');
const HorusTracer = require('../horus/horus.js');
const booksStub = require(path.join(__dirname, "../stubs/booksStub.js"));

const PROTO_PATH = path.join(__dirname, '../protos/customers.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const ht = new HorusTracer();

function GetBookIdAsPromise (bookId, call) {
  let metadataBack = 'pending'; 
  console.log('call to get book id as promise ')
  return new Promise((resolve, reject) => {
    booksStub.GetBookByID(bookId, (error, response) => {
      if (error) resolve('error')
      resolve({book: response, metadata: metadataBack});
    }).on('metadata', (metadata) => metadataBack = metadata);
  })
}

server.addService(customersProto.CustomersService.service, {
  CreateCustomer: async (call, callback) => {
    const result = await controller.createCustomer(call.request);
    const meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    if (result === 'error') {
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error writing to the database',
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
    const meta = new grpc.Metadata();
    meta.add('response', 'none');
    call.sendMetadata(meta);

    if (result === 'error') {
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error deleting from the database',
      });
    }
    callback(null, {});
  },
  GetCustomer: async (call, callback) => {
    // make request to get customer info
    const customer = await controller.getCustomer(call.request);
    // check for error
    if (customer === 'error') {
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error querying the database',
      });
    }
    ht.start('books', call)
    // make request to get book id based on customer's favBookId
      // this contains as properties the book itself, and the metadata of the request  
    const responseFromGetBookById = await GetBookIdAsPromise({ bookId: customer.favBookId });
    console.log('response ', responseFromGetBookById.metadata.get('response')[0])
  
    if (responseFromGetBookById === 'error') {
      ht.end();
      ht.grabTrace('none')
      return callback({ 
        code: grpc.status.STATUS_UNKNOWN,
        message: 'There was an error making an intraservice request to books',
      });
    }

    ht.grabTrace(responseFromGetBookById.metadata.get('response')[0]);
    ht.end();

    const customerWithFavBook = {};
    customerWithFavBook.custId = customer.custId;
    customerWithFavBook.name = customer.name;
    customerWithFavBook.age = customer.age;
    customerWithFavBook.address = customer.address;
    customerWithFavBook.favBook = responseFromGetBookById.book;

    callback(
      null,
      customerWithFavBook,
    );
  },
});

server.bind('127.0.0.1:6000', grpc.ServerCredentials.createInsecure());
console.log('customerServer.js running at http://127.0.0.1:6000');
console.log('call from customer server');

server.start();