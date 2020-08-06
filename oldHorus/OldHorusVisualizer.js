const horusModelConstructor = require("./HorusDataBaseModel.js");
const neo4j = require('neo4j-driver');

const visualize = {};

visualize.mapAveragesToNeo4jBrowser = async function (mongoURL, url, username, password) {

  let driver = neo4j.driver(url, neo4j.auth.basic(username, password));
  let query = '';
  let session;
  const services = new Set();
  const requests = [];
  const methods = {};
  const averages = {};
  const loader = [];
  const horusModel = horusModelConstructor();

  let results = await horusModel.find({});

  // iterate through results
  for (let i = 0; i < results.length; i++) {
    services.add(results[i].client);
    services.add(results[i].server)
    if (methods[results[i].methodName] === undefined) {
      methods[results[i].methodName] = [];
    }
    methods[results[i].methodName].push(results[i].responseTime);
    requests.push({
      to: results[i].server,
      from: results[i].client,
      method: results[i].methodName,
      responseTime: results[i].responseTime
    });
  }

  // create queries for services
  services.forEach(ele => {
    loader.push(`CREATE(${ele}:Service {name: "${ele}"})\n`);
  })

  // iterate through the requests to calculate averages
  requests.forEach((rel) => {
    if (averages[rel.from] === undefined) averages[rel.from] = {};
    if (averages[rel.from][rel.to] === undefined) averages[rel.from][rel.to] = {};
    
    if (averages[rel.from][rel.to][rel.method] === undefined) {
      averages[rel.from][rel.to][rel.method] = {
        average: rel.responseTime, 
        total: rel.responseTime, 
        count: 1};
    } else {
      averages[rel.from][rel.to][rel.method].count += 1;
      averages[rel.from][rel.to][rel.method].total += rel.responseTime;
      averages[rel.from][rel.to][rel.method].average = (averages[rel.from][rel.to][rel.method].total / averages[rel.from][rel.to][rel.method].count);
    }
  })

  // create query for each relationship
  for (let from in averages) {
    console.log('from ', from) 
    for (let to in averages[from]) {
      console.log('to ', to)
      for (let method in averages[from][to]) {
        console.log("method is ", method)
        console.log("value is ", averages[from][to][method])
        let responseTimeAvg = Math.floor(averages[from][to][method].average);
        loader.push(`MERGE (${from}) -[${from + '_' + to + '_'+ method}:${method + '_' + responseTimeAvg}ms]-> (${to})\n`);
      }
    }
  }

    // create and run query string
    query = loader.reduce((acc, ele) => acc + ele)
    session = driver.session();
    session.run(query)
      .catch((error) => console.log(error))
  }

visualize.logAverages = async function logAverages(mongoURL) {
  const services = new Set();
  const requests = [];
  const methods = {};
  const averages = {};
  const horusModel = horusModelConstructor();

  let results = await horusModel.find({});

  // iterate through results
  for (let i = 0; i < results.length; i++) {
    services.add(results[i].client);
    services.add(results[i].server)
    if (methods[results[i].methodName] === undefined) {
      methods[results[i].methodName] = [];
    }
    methods[results[i].methodName].push(results[i].responseTime);
    requests.push({
      to: results[i].server,
      from: results[i].client,
      method: results[i].methodName,
      responseTime: results[i].responseTime
    });
  }

  // iterate through the requests to calculate averages
  requests.forEach((rel) => {
    if (averages[rel.from] === undefined) averages[rel.from] = {};
    if (averages[rel.from][rel.to] === undefined) averages[rel.from][rel.to] = {};
    
    if (averages[rel.from][rel.to][rel.method] === undefined) {
      averages[rel.from][rel.to][rel.method] = {
        average: rel.responseTime, 
        total: rel.responseTime, 
        count: 1};
    } else {
      averages[rel.from][rel.to][rel.method].count += 1;
      averages[rel.from][rel.to][rel.method].total += rel.responseTime;
      averages[rel.from][rel.to][rel.method].average = (averages[rel.from][rel.to][rel.method].total / averages[rel.from][rel.to][rel.method].count);
    }
  })

  // create query for each relationship
  for (let from in averages) {
    for (let to in averages[from]) {
      console.log('Client : ', from, ' Server : ', to);
      for (let method in averages[from][to]) {
        console.log('\t', method, ' ', Math.floor(averages[from][to][method].average), 'ms');
      }
      console.log('\n')
    }
  }

}

module.exports = visualize;