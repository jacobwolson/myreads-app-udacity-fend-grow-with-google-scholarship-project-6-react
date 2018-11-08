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

  updateShelf = (newShelf, book) => {
    book.shelf = newShelf
    let updatedAllBooksInPlayArray
    if (this.state.allBooksInPlay.filter(eachBook => eachBook.id === book.id).length !== 0) {
      // Ternary usage here inspired by answer by S.Kiers; https://stackoverflow.com/a/42259885
      updatedAllBooksInPlayArray = this.state.allBooksInPlay.map(eachBook => eachBook.id === book.id ? eachBook = book : eachBook)
    } else {
      updatedAllBooksInPlayArray = this.state.allBooksInPlay.concat(book)
    }
    // Set state with updated book object.
    this.setState({allBooksInPlay: updatedAllBooksInPlayArray})
    // Update our API with new data so state is retained when we refresh page or otherwise make a BooksAPI.update() call.
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
              updateShelf={this.updateShelf}
            />
          )}
        />
        <Route 
          path="/search" 
          render={( {history} ) => (
            <Search
              allBooksInPlay={this.state.allBooksInPlay}
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
