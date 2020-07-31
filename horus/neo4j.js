const neo4j = require('neo4j-driver');

class Neo4jObject {
  constructor(serviceName, targetService, request, username, password) {
    this.serviceName = serviceName;
    this.targetService = targetService;
    this.request= request;
    this.driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(username, password));
    this.session = this.driver.session();
    this.loader = []; 
  }
  makeQueries() {
    
    let responseTime = this.request.responseTime;
    let index = responseTime.indexOf('.');
    if (index !== -1) responseTime = responseTime.substr(0, index);
    responseTime += 'ms'
    
    this.loader.push(`CREATE(${this.serviceName}:Service {name: "${this.serviceName}"})\n`);
    this.loader.push(`CREATE(${this.targetService}:Service {name: "${this.targetService}"})\n`);
    this.loader.push(`MERGE (${this.serviceName}) -[${this.serviceName + '_' + this.targetService}:${'ResponseTime_' + responseTime}]-> (${this.targetService})\n`);  

    if (this.request[this.targetService] !== 'none') {
      console.log(this.targetService)
      this.handleNestedRequest(this.request[this.targetService], this.targetService);
    }
   
    let query = this.loader.reduce((acc, ele) => {
      return acc + ele;
    })

    console.log(query)
    this.session.run(query)
      .catch((error) => {
        console.log('logging error', error)
      })
  }
  handleNestedRequest(nestedRequest, parentNodeName) {
    let targetName; let responseTime;
    Object.keys(nestedRequest).forEach((ele) => {
      if (ele === 'responseTime') responseTime = nestedRequest[ele];
      else targetName = ele;
    })

    let index = responseTime.indexOf('.');
    if (index !== -1) responseTime = responseTime.substr(0, index);
    responseTime += 'ms';

    this.loader.push(`CREATE(${targetName}:Service {name: "${targetName}"})\n`);
    this.loader.push(`MERGE (${parentNodeName}) -[${parentNodeName + '_' + targetName}:${'ResponseTime_' + responseTime}]-> (${targetName})\n`); 
    if (nestedRequest[targetName] !== 'none') {
      this.handleNestedRequest(nestedRequest[targetName], targetName)
    }
  }
}


module.exports = Neo4jObject;
