import React from 'react';
import '../styles/app.scss'

class CustomerProfile extends React.Component {

  constructor(props){
    super(props);

    this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
  }

  handleDeleteCustomer(e){
    this.props.handleDeleteCustomer(e, this.props.custId)
  }
 
    render () {
    return <div className="custProfile">
            <h4>{this.props.name}</h4>
            <ul className="custInfo">
              <li>Cust ID#: {this.props.custId}</li>
              <li>Age: {this.props.age}</li>
              <li>Address: {this.props.address}</li>
            </ul>
            <h4>Favorite Book: {this.props.favBook.title}</h4>
              <ul className="favBookInfo">
                <li>By: {this.props.favBook.author}</li>
                <li>{this.props.favBook.numberOfPages} pages</li>
                <li>Published By: {this.props.favBook.publisher}</li>
                <li>Book ID#: {this.props.favBook.bookId}</li>
              </ul>
              <button type="button" id="deleteCustomerButton" onClick={this.handleDeleteCustomer}>Delete Customer Profile</button>
           </div>
  }
}

export default CustomerProfile