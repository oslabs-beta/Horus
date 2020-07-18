const bookStub = require("./stubs/booksStub.js");

console.log('process.env vars', process.env.function)

function main (functionName) {
  if (functionName === 'createBook') {  
    bookStub.CreateBook({
      title: 'Harry Potter', 
      author: 'J.K Rowlings',
      pages: 100,
      publisher: 'Random House',
      id: 1
    }, (error, data) => {
      console.log('CreateBook callback')
      console.log('logging data', data)
    })
  }
  else console.log('wrong enviroment name passed in')
}

main(process.env.function);