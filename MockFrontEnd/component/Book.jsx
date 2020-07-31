import React from 'react';
import '../styles/app.scss'

class Book extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookId: '',
      key: ''
    }
    // this.deleteBook = this.deleteBook.bind(this);
  }

  // deleteBook(e) {
  //   event.preventDefault();
  //   console.log(`Delete Book for ${this.props.bookId} clicked.`)
  //   let bookId = this.props.bookId
  //   fetch(`http://localhost:3000/books/${bookId}`, {
  //     method: 'DELETE'
  //   })
  //   .then(this.props.deleteBook(bookId))
  // }

  render () {
    console.log('THIS.PROPS IN BOOK: ', this.props)
    return <div className="bookBox">
             <h4>{this.props.title}</h4>
             <ul className="bookInfo">
               <li>By: {this.props.author}</li>
               <li>{this.props.numberOfPages} pages</li>
               <li>Published By: {this.props.publisher}</li>
               <li>Book ID#: {this.props.bookId}</li>
             </ul>
             <button type="button" id="deleteBooksbutton" onClick={this.props.deleteBook} bookId={this.props.bookId}>Delete Book</button>
           </div>
  }
}

export default Book