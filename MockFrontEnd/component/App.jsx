import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/app.scss'

class App extends React.Component{
    render(){
        return(
            <div>Hello World</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App