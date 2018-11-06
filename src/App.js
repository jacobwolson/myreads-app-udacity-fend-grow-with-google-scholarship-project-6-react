import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route, Redirect } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  addToAllBooks = (thisBookID, thisBook) => {
    let checkForExisting = this.state.allBooks.filter(eachBook => eachBook.id === thisBookID)
    if (checkForExisting.length === 0) {
      this.setState({allBooks: this.state.allBooks.concat(thisBook)})
    }
  }

  /* Consulted: https://stackoverflow.com/a/37435764 */
  /* Consulted: computed property names; https://stackoverflow.com/a/29281499 */
  /* Consulted: use filter to remove; https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state */
  /* Consulted: dynamic key value in setState: https://stackoverflow.com/questions/46016465/get-react-state-with-dynamic-key */ 
  /* Consulted: check if array includes x; https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript */
  /* Consulted: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
  updateShelf = (bookID, newShelf) => {
    let bookToMove = this.state.allBooks.filter(book => book.id === bookID)
    let shelfToMoveFrom;
    let stateToRemoveFrom;

    {bookToMove[0].shelf !== undefined && (shelfToMoveFrom = bookToMove[0].shelf)}

    stateToRemoveFrom = this.state[shelfToMoveFrom]

    if (newShelf === 'currentlyReading') {
      let checkForExisting = this.state.currentlyReading.filter(book => book.id === bookID)
      if (checkForExisting.length === 0) {
        {shelfToMoveFrom !== undefined && 
          (this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)}))
        }
        bookToMove[0].shelf = 'currentlyReading'
        this.setState({currentlyReading: this.state.currentlyReading.concat(bookToMove)})
      }
    } else if (newShelf === 'wantToRead') {
      let checkForExisting = this.state.wantToRead.filter(book => book.id === bookID)
      if (checkForExisting.length === 0) {
        {shelfToMoveFrom !== undefined && 
          (this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)}))
        }
        bookToMove[0].shelf = 'wantToRead'
        this.setState({wantToRead: this.state.wantToRead.concat(bookToMove)})
      }
    } else if (newShelf === 'read') {
      let checkForExisting = this.state.read.filter(book => book.id === bookID)
      if (checkForExisting.length === 0) {
        {shelfToMoveFrom !== undefined && 
          (this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)}))
        }
        bookToMove[0].shelf = 'read'
        this.setState({read: this.state.read.concat(bookToMove)})
      }
    } else if (newShelf === 'none') {
      let checkForExisting = this.state.allBooks.filter(book => book.id === bookID)
      {shelfToMoveFrom !== undefined && 
        (this.setState({[shelfToMoveFrom] : stateToRemoveFrom.filter(book => book.id !== bookID)}))
      }
      bookToMove[0].shelf = 'none'
      if (checkForExisting.length === 0) {
        this.setState({allBooks: this.state.allBooks.concat(bookToMove)})
      }  
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
      let wantToRead = books.filter(book => book.shelf === "wantToRead")
      let read = books.filter(book => book.shelf === "read")
      this.setState({allBooks: books})
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
              allBooks={this.state.books}
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
              allBooks={this.state.allBooks}
              searchResults={this.state.searchResults}
              addToAllBooks={this.addToAllBooks}
              updateShelf={this.updateShelf}
              navigateToHome={() => {history.push('/')}}
              />
          )}
        />
      </div>
    )
  }
}

export default App