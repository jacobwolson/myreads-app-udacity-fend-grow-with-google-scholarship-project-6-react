import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    allBooksInPlay: []
  }
  
  addToallBooksInPlay = (thisBookID, thisBook) => {
    let checkForExisting = this.state.allBooksInPlay.filter(eachBook => eachBook.id === thisBookID)
    if (checkForExisting.length === 0) {
      this.setState({allBooksInPlay: this.state.allBooksInPlay.concat(thisBook)})
    }
  }

  /* Consulted for writing updateShelf method:
    */
  updateShelf = (newShelf, book) => {
    /*  Option A: If book in question is already in `allBooksInPlay` state array then book in question will already
    have a shelf property set -- and will display in both the listBooks component and in search results. In 
    this case, run the `if` statemtent. 
        Option B: Otherwise, if book in question does not have an existing shelf property -- 
    which means it will only currently be displaying as a search result -- run the `else` statement. */
    if (this.state.allBooksInPlay.filter(eachBook => eachBook.id === book.id) !== 0) {
      const updatedAllBooksInPlayArray = this.state.allBooksInPlay.map(eachBook => eachBook.id === book.id ? eachBook = book : eachBook)
      // Update value of the shelf property on, or add a shelf property and concomitant value to, the selected book.
      book.shelf = newShelf
      // Option A: set state with updated book object.
      this.setState({allBooksInPlay: updatedAllBooksInPlayArray})
    } else {
      // Option B: set state, adding new book with newly added `shelf` property to state.
      this.setState({allBooksInPlay: this.state.allBooksInPlay.concat(book)})
    }
    /* Update API with newly shelved book so that if we refresh or for whatever reason make new 
    `BooksAPI.getAll()` call, app will still be in same state */
    BooksAPI.update(book, newShelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({allBooksInPlay: books})
    }) 
  }

  render() {
    return(
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <ListBooks
              allBooksInPlay={this.state.allBooksInPlay}
              changeShelf={this.updateShelf}
            />
          )}
        />
        <Route 
          path="/search" 
          render={( {history} ) => (
            <Search
              allBooksInPlay={this.state.allBooksInPlay}
              searchResults={this.state.searchResults}
              addToallBooksInPlay={this.addToallBooksInPlay}
              updateShelf={this.updateShelf}
              /* Consulted: "Programmatically navigate with React Router" by Tyler McGinnis: 
                https://tylermcginnis.com/react-router-programmatically-navigate/ */
              navigateToHome={() => {history.push('/')}}
              />
          )}
        />
      </div>
    )
  }
}

export default App
