const grpc = require("grpc");

function wrapMethods(metadata, methods) {
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {
      methods[name](call, (error, response) => {
        let meta = new grpc.Metadata();
        meta.add("response", JSON.stringify(metadata.trace));
        call.sendMetadata(meta);
        metadata.trace = "none";
        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

class HorusServerWrapper {
  constructor(server, proto, methods) {
    this.metadata = { trace: "none" };
    const wrappedMethods = wrapMethods(this.metadata, methods);
    server.addService(proto, wrappedMethods);
  }
  acceptMetadata(metadataFromClient) {
    this.metadata.trace = metadataFromClient;
  }
}

module.exports = HorusServerWrapper;
