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
    // this.deleteBook = this.deleteBook.bind(this)
  }

  handleGetBooks(data) {
    this.setState({data: data})
  }

  // deleteBook(e) {
  //   event.preventDefault();
  //   console.log(`Delete Book for ${this.state.bookId} clicked.`)
  //   let bookId = this.state.bookId
  //   fetch(`http://localhost:3000/books/${bookId}`, {
  //     method: 'DELETE'
  //   })
  //   .then(console.log(`${bookId} DELETED`))
  // }

    render(){
        return(
            <div>
              <TopContainer />
              <div className='MainBody'>
                <LeftContainer handleGetBooks={this.handleGetBooks.bind(this)}/>
                <MainContainer data={this.state.data} deleteProfile={this.deleteBook} />
              </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App