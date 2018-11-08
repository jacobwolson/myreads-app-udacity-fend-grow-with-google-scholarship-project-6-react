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
    const updatedAllBooksInPlayArray = this.state.allBooksInPlay.map(eachBook => eachBook.id === book.id ? eachBook = book : eachBook)
    // Update value of the shelf property on, or add a shelf property and concomitant value to, the selected book.
    book.shelf = newShelf
    // Set state with updated book object.
    this.setState({allBooksInPlay: updatedAllBooksInPlayArray})
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
