import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'

class LeftContainer extends React.Component {
    constructor() {
        super();
        this.state ={};
        this.handleCreateCustomerButton = this.handleCreateCustomerButton.bind(this);
    }

    handleCreateCustomerButton(e) {
        console.log('call to create customer')
        // let url = 'http://localhost:3000/customers'
        fetch('http://localhost:3000/customers', {
            method: 'POST',
            body: JSON.stringify({})
        }).then(res => res.json())
        .then(data => console.log('Data retrieved: ',data))
    }

    render(){
        return(
            <div className='LeftContainer'>
                Hello LeftContainer
                <form className='CreateCustomerForm'>
                    <h4>Create New Customer</h4>
                    <label>Customer ID:  </label>
                    <input id="custId" type="text"></input>
                    <br />
                    <label>Customer Name:  </label>
                    <input id="custName" type="text"></input>
                    <br />
                    <label>Customer Age:  </label>
                    <input id="custAge" type="text"></input>
                    <br />
                    <label>Customer Address:  </label>
                    <input id="custAddress" type="text"></input>
                    <br />
                    <label>Favorite Book ID:  </label>
                    <input id="favBookID" type="text"></input>
                    <br />
                    <button type="button" id="createCustomerButton" onClick={this.handleCreateCustomerButton}>Create Customer</button>
                </form>
            </div>
        )
    }
}

export default LeftContainer