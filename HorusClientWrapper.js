const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function appendToFileWrapper(file, str) {
  fs.appendFile(file, str, (error) => {
    if (error) console.log(`ERROR with fs, could not write ${file} file `, error);
  }); 
}

function writeToFile(file, data, tabs=0, first=true) { 
  console.log('data ', data)
  let str = '';
  let tabsStr = '\t'.repeat(tabs);
  if (first) str += '-'.repeat(100) + '\n';
  str += `${tabsStr}Method : ${data.methodName}\n${tabsStr}Response Time : ${data.responseTime}\n${tabsStr}ID : ${data.id}\n`
  if (data.trace === 'none') {
    str += `${tabsStr}Trace : no additional routes\n\n`;
    appendToFileWrapper(file, str);
  } else {
    str += `${tabsStr}Trace : \n`;
    str += tabsStr + '\t\t' + '-'.repeat(50) + '\n';
    appendToFileWrapper(file, str);
    writeToFile(file, data.trace, tabs + 2, false);
  }
};

function makeMethods(clientWrapper, client, metadata, names, file, writeToFile) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    metadata[name] = {
      methodName: name,
      responseTime: null,
      id: null,
      trace: {},
    };
    clientWrapper[name] = function (message, callback) {
      const startTime = process.hrtime.bigint();
      client[name](message, (error, response) => {
        metadata[name].responseTime = Number(process.hrtime.bigint() - startTime) / 1000000;
        metadata[name].id = uuidv4();
        console.log("logging metadata ", metadata[name])
        writeToFile(file, metadata[name]);     
        callback(error, response);
      }).on('metadata', (metadataFromServer) => { 
        metadata[name].trace = JSON.parse(metadataFromServer.get('response')[0]);
      });
    }
  }
}

class HorusClientWrapper {
  constructor(client, service, file) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names, file, writeToFile);
  }
  makeHandShakeWithServer(server, method) {
    server.acceptMetadata(this.metadata[method]);
  }
}

module.exports = HorusClientWrapper;