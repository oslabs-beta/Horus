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
        // this.deleteBook = this.deleteBook.bind(this)
      }
    //   handleGetBooks(data) {
    //     console.log('MAIN CONTAINER PROPS: ', this.props)
    //     this.setState({data: this.props.data})
    //   }
      
    //   deleteBook(bookId) {
    //     this.setState()
    //   }
    
    render(){
        const bookList = this.props.data.books
        const items = []
        if (bookList){
          for (let i = 0; i < bookList.length; i++){
            items.push(
                <Book key={'book'+i} title={bookList[i].title} author={bookList[i].author} numberOfPages={bookList[i].numberOfPages} publisher={bookList[i].publisher} bookId={bookList[i].bookId} deleteBook={this.props.deleteBook} />
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