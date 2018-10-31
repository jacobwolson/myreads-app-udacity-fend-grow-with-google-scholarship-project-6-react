import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import Search from './Search'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  render() {
    return(
      <div>
        <Route
          exact path="/"
          component={Bookshelf}
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