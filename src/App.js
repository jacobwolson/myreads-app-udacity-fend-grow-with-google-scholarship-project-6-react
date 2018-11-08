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
  updateShelf = (bookID, newShelf, book) => {
    /* If book in question is already in `allBooksInPlay` state array then book in question will already
    have a shelf property set and will display in both the listBooks component and in search results. In 
    this case, run the `if` statemtent. Otherwise, if book in question does not have an existing shelf property, 
    which means it will only currently be displaying as a search result, run the else statement. */
    if (this.state.allBooksInPlay.filter(saidBook => saidBook.id === book.id) !== 0) { 
      let bookToMove = this.state.allBooksInPlay.filter(book => book.id === bookID)
      const findBookToMove = saidBook => saidBook.id === book.id
      const indexOfBookToMove = this.state.allBooksInPlay.findIndex(findBookToMove)
      const updatedAllBooksInPlayArray = this.state.allBooksInPlay.map(saidBook => saidBook.id === book.id ? saidBook = book : saidBook = saidBook)
      
      // Update the shelf property on the selected book
      book.shelf = newShelf
      
      this.setState({allBooksInPlay: updatedAllBooksInPlayArray})
    } else {
      this.setState({allBooksInPlay: this.state.allBooksInPlay.concat(book)})
    }
    
    /* Update API with newly shelved book so that if we refresh and make new `BooksAPI.getAll()` call, 
    app will still be in same state */
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
