const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'))

class Neo4j {
  constructor(serviceName, targetService, request) {
    this.serviceName = serviceName;
    this.targetService = targetService;
    this.request= request;
    this.session = driver.session();
    this.loader = []; 
  }
  makeQueries() {
    this.loader.push(`CREATE(${this.serviceName}:Service {name: "${this.serviceName}"})\n`);
    this.loader.push(`CREATE(${this.targetService}:Service {name: "${this.targetService}"})\n`);
    this.loader.push(`MERGE (${this.serviceName}) -[${this.serviceName + '_' + this.targetService}:${'ResponseTime_' + this.request.responseTime}]-> (${this.targetService})\n`);  

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
    this.loader.push(`CREATE(${targetName}:Service {name: "${targetName}"})\n`);
    this.loader.push(`MERGE (${parentNodeName}) -[${parentNodeName + '_' + targetName}:${'ResponseTime_' + responseTime}]-> (${targetName})\n`); 
    if (nestedRequest[targetName] !== 'none') {
      this.handleNestedRequest(nestedRequest[targetName], targetName)
    }
  }
}

const request = {
  books: {
    main: 'none' 
    responseTime: 10
  },
  responseTime: 20
}

let ht = new Horus('main', 'books', request)

//ht.makeQueries();

ht.makeQueries(request, 'books')
