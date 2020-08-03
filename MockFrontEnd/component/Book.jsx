import React from 'react';
import '../styles/app.scss'

class Book extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookId: '',
      key: ''
    }
    this.handleDeleteBook = this.handleDeleteBook.bind(this)
  }
  
  handleDeleteBook(e){
    this.props.handleDeleteBook(e, this.props.bookId)
  }

  render () {
    return <div className="bookBox">
             <h4>{this.props.title}</h4>
             <ul className="bookInfo">
               <li>By: {this.props.author}</li>
               <li>{this.props.numberOfPages} pages</li>
               <li>Published By: {this.props.publisher}</li>
               <li>Book ID#: {this.props.bookId}</li>
             </ul>
             <button type="button" id="deleteBooksbutton" onClick={this.handleDeleteBook} >Delete Book</button>
           </div>
  }
}

export default Book