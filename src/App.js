import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  placeBook = () => {

  }

  render() {
    return(
      <div class="app">
        <Route
          exact path="/"
          component={ListBooks}
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