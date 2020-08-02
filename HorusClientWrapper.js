const grpc = require('grpc');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function makeNestedMetadata(metadata, tabCount) {
  let tabs = '\t'.repeat(tabCount);
  let str = '';
  str += tabs + '-'.repeat(10) + '\n'
  str += tabs + 'Method Name : ' + metadata.methodName + '\n';
  str += tabs + 'ResponseTime : ' + metadata.responseTime + '\n';
  str += tabs + 'ID : ' + metadata.id + '\n';
  if (metadata.requestPath !== 'none') {
    const keys = Object.keys(metadata.requestPath);
    keys.forEach((key) => {
      str += makeNestedMetadata(metadata.requestPath[key], tabCount + 1);
    })  
  }
  return str;
}

function WriteToFile(fileName, metadata) {
  console.log("call to write to file")
  let str = '';
  str += 'Method Name : ' + metadata.methodName + '\n';
  str += 'ResponseTime : ' + metadata.responseTime + '\n';
  str += 'ID : ' + metadata.id + '\n';
  if (metadata.requestPath !== 'none') {
    const keys = Object.keys(metadata.requestPath);
    keys.forEach((key) => {
      str += makeNestedMetadata(metadata.requestPath[key], 1);
    })  
  }
  str += '\n'
  console.log("call to append file ", fileName)
  fs.appendFile(fileName, str, (error) => {
    if (error) console.log('ERROR Horus Object could no write to ' + fileName + ' ', error);
  });
}

class ClientWrapper {
  constructor(client, service, textFileName) {
    this.client = client; 
    this.metadata = {}; 
    this.textfileName = textFileName || 'horus.txt';
    const keys = Object.keys(service.service); 
    for (let i = 0; i < keys.length; i++) { 
      let metadata = this.metadata; 
      this[keys[i]] = (object, callback) => { 
        metadata[keys[i]] = {
          methodName: keys[i],
          requestPath: {},
          responseTime: 'pending'
        }
        let start = process.hrtime.bigint();
        this.client[keys[i]](object, (error, response) => { 
          let end = process.hrtime.bigint();
          metadata[keys[i]].responseTime = Number(end - start) / 1000000;
          metadata[keys[i]].id = uuidv4();
          console.log("logging metadata ", metadata[keys[i]])
          WriteToFile(textFileName, metadata[keys[i]]);
          callback(error, response); 
        }).on("metadata", (metadataFromServer) => { 
          metadata[keys[i]].requestPath = JSON.parse(metadataFromServer.get('response')[0]);
        })
      }
    }
  }
  passDataToServer(server) { 
    server.recieveDataFromClient(this.metadata);
  }
}

module.exports = ClientWrapper;