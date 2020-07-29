import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'

class LeftContainer extends React.Component {
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
                    <button type="button" id="createCustomerButton">Create Customer</button>
                </form>
            </div>
        )
    }
}

export default LeftContainer