import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'
import Book from '../component/Book.jsx'

class MainContainer extends React.Component {
    render(){
        const items = [];
        for (let i = 0; i < bookList.length; i++){
          items.push(
              <Book key={'book'+i} title={bookList[i].title} author={bookList[i].author} numberOfPages={bookList[i].numberOfPages} publisher={bookList[i].publisher} bookId={bookList[i].bookId} />
          )
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