import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'
import Book from '../component/Book.jsx'
import CustomerProfile from '../component/CustomerProfile.jsx'

class MainContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: '',
            profile: ''
        }
        this.handleDeleteBook = this.handleDeleteBook.bind(this)
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
      }

      handleDeleteBook(e, bookId){
        this.props.deleteBook(e, bookId)
      }

      handleDeleteCustomer(e, custId){
          this.props.deleteCustomer(e, custId)
      }

      componentWillReceiveProps(nextProps) {
        if(nextProps.data){
          this.setState({profile: ''})
          this.setState({items: nextProps.data})
        }
        if(nextProps.profile){
          this.setState({items: ''})
          this.setState({profile: nextProps.profile})
        }
      }
    
    render(){
        const bookList = this.state.items
        const profile = this.state.profile
        const items = []
        if (bookList){
          for (let i = 0; i < bookList.length; i++){
            items.push(
                <Book title={bookList[i].title} author={bookList[i].author} numberOfPages={bookList[i].numberOfPages} publisher={bookList[i].publisher} bookId={bookList[i].bookId} handleDeleteBook={this.handleDeleteBook} key={i}  />
            )
          }
        } else if (profile){
            items.push(
                <CustomerProfile name={profile.name} custId={profile.custId} age={profile.age} address={profile.address} favBook={profile.favBook} handleDeleteCustomer={this.handleDeleteCustomer} />
            )
        }
        return(
            <div className='MainContainer'>
                {items}
            </div>
        )
    }
}

export default MainContainer