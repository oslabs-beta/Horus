import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'
import Book from '../component/Book.jsx'

class MainContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: ''
        }
        this.handleDeleteBook = this.handleDeleteBook.bind(this)
      }

      handleDeleteBook(e, bookId){
        this.props.deleteBook(e, bookId)
      }

      componentWillReceiveProps(nextProps) {
          this.setState({items: nextProps.data})
      }
    
    render(){
        const bookList = this.state.items
        const items = []
        if (bookList){
          for (let i = 0; i < bookList.length; i++){
            items.push(
                <Book title={bookList[i].title} author={bookList[i].author} numberOfPages={bookList[i].numberOfPages} publisher={bookList[i].publisher} bookId={bookList[i].bookId} handleDeleteBook={this.handleDeleteBook} key={i}  />
            )
          }
        }
        return(
            <div className='MainContainer'>
                Hello Main Container:
                {items}
            </div>
        )
    }
}

export default MainContainer