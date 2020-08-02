const grpc = require('grpc');

class ServerWrapper { 
  constructor(server, proto, methods) { 
    this.metadata = {data:'none'};

    const keys = Object.keys(methods);  
    const values = Object.values(methods);
    const wrappedMethods = {}; 

    let metadata = this.metadata; 

    for (let i = 0; i < keys.length; i++) {

      wrappedMethods[keys[i]] = function(call, callback) { 

        values[i](call, (error, object) => { 
          let meta = new grpc.Metadata();
          meta.add('response', JSON.stringify(metadata.data)) 
          call.sendMetadata(meta);
          metadata.data = 'none'; 

          if (error) return callback(error)

          callback(error, object); 
        });
      }
    }
    server.addService(proto, wrappedMethods); 
  }
  recieveDataFromClient(data) { 
    this.metadata.data = data;
  }
}

module.exports = ServerWrapper;