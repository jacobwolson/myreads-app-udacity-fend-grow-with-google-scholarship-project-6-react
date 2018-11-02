import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    books: []
  }
  
  placeBook = () => {

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books: books})
      // console.log(this.state.books)
    })
  }

  render() {
    return(
      <div className="app">
      {/* {JSON.stringify(this.state.books)} */}
        <Route
          exact path="/"
          // component={ListBooks}
          render={() => (
            <ListBooks
              allBooks={this.state.books}
            />
          )}
        />
        <Route 
          path="/search" 
          component={Search}
        />
      </div>
    )
  }
}



export default App