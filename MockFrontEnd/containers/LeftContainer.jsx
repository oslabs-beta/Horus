import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'

class LeftContainer extends React.Component {
    constructor() {
        super();
        this.state ={
            custId: '',
            name: '',
            age: '',
            address: '',
            favBookId: ''
        };
        //this.handleCreateCustomerButton = this.handleCreateCustomerButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCustomerSubmit = this.handleCustomerSubmit.bind(this);
    }

       handleChange(e) {
         this.setState({ [e.target.name]: e.target.value });
       }

       handleCustomerSubmit(e) {
           e.preventDefault();
           let url = 'http://localhost:3000/customers';
           fetch(url, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                custId: this.state.custId,
                   name: this.state.name,
                   age: this.state.age,
                   address: this.state.address,
                   favBookId: this.state.favBookId
               })
           })
           .then(res => res.json())
           .then(data => {
               console.log('Data retrieved: ', data)
           })
       }
    // handleCreateCustomerButton(e) {
    //     console.log('call to create customer')
    //     // let url = 'http://localhost:3000/customers'
    //     fetch('http://localhost:3000/customers', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             custId: this.state.custId,
    //             name: this.state.name,
    //             age: this.state.age,
    //             address: this.state.address,
    //             favBookId: this.state.favBookId
    //         })
    //     }).then(res => res.json())
    //     .then(data => console.log('Data retrieved: ',data))
    // }

    render(){
        return(
            <div className='LeftContainer'>
                Hello LeftContainer
                <form onSubmit={this.handleCustomerSubmit} className='CreateCustomerForm'>
                    <h4>Create New Customer</h4>
                    <label>Customer ID:  </label>
                    <input 
                        id="custId"
                        type="text"
                        name="custId"
                        value={this.state.custId}
                        placeholder='Enter Customer ID'
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Customer Name:  </label>
                    <input
                    id="custName"
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder='Enter Name'
                    onChange={this.handleChange}
                    />
                    <br />
                    <label>Customer Age:  </label>
                    <input
                    id="custAge"
                    type="text"
                    name="age"
                    value={this.state.age}
                    placeholder="Enter Age"
                    onChange={this.handleChange}
                    />
                    <br />
                    <label>Customer Address:  </label>
                    <input
                    id="custAddress"
                    type="text"
                    name="address"
                    value={this.state.address}
                    placeholder="Enter Address"
                    onChange={this.handleChange}
                    />
                    <br />
                    <label>Favorite Book ID:  </label>
                    <input
                    id="favBookId"
                    type="text"
                    name="favBookId"
                    value={this.state.favBookId}
                    placeholder="Enter Favorite Book ID"
                    onChange={this.handleChange}
                    />
                    <br />
                    <button type="submit" id="createCustomerButton">Create Customer</button>
                    {/* <button type="button" id="createCustomerButton" onClick={this.handleCreateCustomerButton}>Create Customer</button> */}
                </form>
                <form onSubmit={this.handleBookSubmit} className='CreateBookForm'>
                    <h4>Add Book to Bookstore</h4>
                    <label>Title: </label>
                    <input />
                    <br/>
                    <label>Author: </label>
                    <input />
                    <br/>
                    <label># of Pages: </label>
                    <input />
                    <br/>
                    <label>Publisher: </label>
                    <input />
                    <br/>
                    <label>Book ID #: </label>
                    <input />
                    <br/>
                </form>
            </div>
        )
    }
}

export default LeftContainer