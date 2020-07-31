import React from 'react';

class Book extends React.Component {
  render () {
    return <div className="bookBox">
             <h4>{this.props.title}</h4>
             <ul className="bookInfo">
               <li>By: {this.props.author}</li>
               <li>{this.props.numberOfPages} pages</li>
               <li>Published By: {this.props.numberOfPages}</li>
               <li>Book ID#: {this.props.bookId}</li>
             </ul>
             <button type="button" id="deleteBooksbutton" onClick={this.props.deleteBook}>Delete Book</button>
           </div>
  }
}

export default Book