import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    allBooksInPlay: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  addToallBooksInPlay = (thisBookID, thisBook) => {
    let checkForExisting = this.state.allBooksInPlay.filter(eachBook => eachBook.id === thisBookID)
    if (checkForExisting.length === 0) {
      this.setState({allBooksInPlay: this.state.allBooksInPlay.concat(thisBook)})
    }
  }

  /* Consulted for writing updateShelf method:
     - pushing new data on to state array: answer by Ginden; https://stackoverflow.com/a/37435764
     - using computed property names when setting state: answer by trad; https://stackoverflow.com/a/29281499 
     - using filter to remove data from state array: 
          answer by ephrion; https://stackoverflow.com/a/31838774,
          entry 'Array.prototype.filter' at MDN; 
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     - using dynamic key value when setting state: answer by Aaron; https://stackoverflow.com/a/46016573
     - checking if array includes certain object: answer by AlonL; https://stackoverflow.com/a/27819913 */
  updateShelf = (bookID, newShelf, book) => {
    let bookToMove = this.state.allBooksInPlay.filter(book => book.id === bookID)
    let shelfToMoveFrom;
    let stateToRemoveFrom;

    if (bookToMove[0].shelf !== undefined) {
      shelfToMoveFrom = bookToMove[0].shelf
    }

    stateToRemoveFrom = this.state[shelfToMoveFrom]

    if (newShelf === 'currentlyReading') {
      let checkForExisting = this.state.currentlyReading.filter(book => book.id === bookID)
      if (checkForExisting.length === 0) {
        if (shelfToMoveFrom !== undefined) {
          this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)})
        }
        bookToMove[0].shelf = 'currentlyReading'
        this.setState({currentlyReading: this.state.currentlyReading.concat(bookToMove)})
      }
    } else if (newShelf === 'wantToRead') {
        let checkForExisting = this.state.wantToRead.filter(book => book.id === bookID)
        if (checkForExisting.length === 0) {
          if (shelfToMoveFrom !== undefined) {
            this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)})
          }
          bookToMove[0].shelf = 'wantToRead'
          this.setState({wantToRead: this.state.wantToRead.concat(bookToMove)})
        }
    } else if (newShelf === 'read') {
        let checkForExisting = this.state.read.filter(book => book.id === bookID)
        if (checkForExisting.length === 0) {
          if (shelfToMoveFrom !== undefined) {
            this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)})
          }
          bookToMove[0].shelf = 'read'
          this.setState({read: this.state.read.concat(bookToMove)})
        }
    } else if (newShelf === 'none') {
        let checkForExisting = this.state.allBooksInPlay.filter(book => book.id === bookID)
        if (shelfToMoveFrom !== undefined) {
          this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)})
        }
        bookToMove[0].shelf = 'none'
        if (checkForExisting.length === 0) {
          this.setState({allBooksInPlay: this.state.allBooksInPlay.concat(bookToMove)})
        }  
    }

    BooksAPI.update(book, newShelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
      let wantToRead = books.filter(book => book.shelf === "wantToRead")
      let read = books.filter(book => book.shelf === "read")
      this.setState({allBooksInPlay: books})
      this.setState({currentlyReading})
      this.setState({wantToRead})
      this.setState({read})
    }) 
  }

  render() {
    return(
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <ListBooks
              allBooksInPlay={this.state.books}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
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
