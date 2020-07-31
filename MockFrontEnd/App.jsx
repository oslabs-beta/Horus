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
      bookId: ''
    }
    this.deleteBook = this.deleteBook.bind(this)
    this.handleGetBooks = this.handleGetBooks.bind(this)
  }

  // handleGetBooks(data) {
  //   this.setState({data: data})
  // }

  handleGetBooks(e){
    e.preventDefault();
    fetch('http://localhost:3000/books', {
        method: 'GET',

    })
    .then(res => res.json())
    .then(data => {
        this.setState({data: data})
    })
  }

  deleteBook(e) {
    e.preventDefault();
    console.log('THIS: ', this)
    console.log(`Delete Book for ${this.state.bookId} clicked.`)
    let bookId = this.state.data
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'DELETE'
    })
    .then(console.log(`${this.state.data}`))
  }

    render(){
      console.log("PROPS IN APP: ", this.props)
        return(
            <div>
              <TopContainer />
              <div className='MainBody'>
                <LeftContainer handleGetBooks={this.handleGetBooks}/>
                <MainContainer data={this.state.data} deleteBook={this.deleteBook} />
              </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App