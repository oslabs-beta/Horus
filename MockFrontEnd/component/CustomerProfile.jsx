import React from 'react';
import '../styles/app.scss'

class CustomerProfile extends React.Component {

  constructor(props){
    super(props);
    // this.state = {
    //   bookId: '',
    //   key: ''
    // }
    // this.handleDeleteBook = this.handleDeleteBook.bind(this)
  }
  
  // handleDeleteBook(e){
  //   this.props.handleDeleteBook(e, this.props.bookId)
  // }

    render () {
      console.log('THIS.PROPS IN CUSTOMERPROFILE: ', this.props)
    return <div className="custProfile">
            <h4>{this.props.name}</h4>
            <ul className="custInfo">
              <li>Cust ID#: {this.props.custId}</li>
              <li>Age: {this.props.age}</li>
              <li>Address: {this.props.address}</li>
            </ul>
            <h4>Favorite Book:</h4>
            <h4>{this.props.favBook.title}</h4>
              <ul className="favBookInfo">
                <li>By: {this.props.favBook.author}</li>
                <li>{this.props.favBook.numberOfPages} pages</li>
                <li>Published By: {this.props.favBook.publisher}</li>
                <li>Book ID#: {this.props.favBook.bookId}</li>
              </ul>
           </div>
  }
}

export default CustomerProfile