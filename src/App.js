import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    books: [],
    searchResults: []
  }
  
  placeBook = () => {

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books: books})
    })
  }


  render() {
    return(
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <ListBooks
              allBooks={this.state.books}
            />
          )}
        />
        <Route 
          path="/search" 
          render={() => (
            <Search
              searchResults={this.state.searchResults}
              />
          )}
          // component={Search}
        />
      </div>
    )
  }
}



export default App