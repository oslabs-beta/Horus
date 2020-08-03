import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/app.scss'
import MainContainer from './containers/MainContainer.jsx'
import TopContainer from './containers/TopContainer.jsx'
import LeftContainer from './containers/LeftContainer.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: '',
      profile: '',
    }
    this.deleteBook = this.deleteBook.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.handleGetBooks = this.handleGetBooks.bind(this)
    this.handleGetCustomer = this.handleGetCustomer.bind(this)
  }

  handleGetBooks(e){
    e.preventDefault();
    fetch('http://localhost:3000/books', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        this.setState({data: data.books, profile: ''})
    })
  }

  handleGetCustomer(e){
    e.preventDefault();
    fetch('http://localhost:3000/customers', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      console.log('data :',data)
      this.setState({data: '', profile: data})
    })
  }

  deleteBook(e, bookId){
    e.preventDefault()
    let newBookList = this.state.data.filter(book => book.bookId !== bookId)
    this.setState({data: newBookList})
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'Delete'
    })
  }

  deleteCustomer(e, custId){
    e.preventDefault()
    console.log('deleteCustomer in App.jsx clicked!')
    console.log('custId in App.jsx:', custId)
    this.setState({profile: ''})
    fetch(`http://localhost:3000/customers/${custId}`, {
      method: 'Delete'
    })
  }

    render(){
        return(
            <div>
              <TopContainer />
              <div className='MainBody'>
                <LeftContainer handleGetBooks={this.handleGetBooks} handleGetCustomer={this.handleGetCustomer}/>
                <MainContainer data={this.state.data} profile={this.state.profile} deleteBook={this.deleteBook} deleteCustomer={this.deleteCustomer} />
              </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App