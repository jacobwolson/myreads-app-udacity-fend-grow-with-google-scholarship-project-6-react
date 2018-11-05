import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  /* Consulted: https://stackoverflow.com/a/37435764 */
  /* Consulted: computed property names; https://stackoverflow.com/a/29281499 */
  /* Consulted: use filter to remove; https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state */
  /* Consulted: dynamic key value in setState: https://stackoverflow.com/questions/46016465/get-react-state-with-dynamic-key */ 
  updateShelf = (bookID, currentShelf, newShelf) => {
    let bookToMove = this.state.allBooks.filter(book => book.id === bookID)
    let stateToRemoveFrom = this.state[currentShelf]
    if (newShelf === 'currentlyReading') {
    this.setState({ [currentShelf] : stateToRemoveFrom.filter(book => book.id !== bookID) })
    this.setState({currentlyReading: this.state.currentlyReading.concat(bookToMove)})
    } else if (newShelf === 'wantToRead') {
      this.setState({ [currentShelf] : stateToRemoveFrom.filter(book => book.id !== bookID) })
      this.setState({wantToRead: this.state.wantToRead.concat(bookToMove)})
    } else if (newShelf === 'read') {
      this.setState({ [currentShelf] : stateToRemoveFrom.filter(book => book.id !== bookID) })
      this.setState({read: this.state.read.concat(bookToMove)})
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
      let wantToRead = books.filter(book => book.shelf === "wantToRead")
      let read = books.filter(book => book.shelf === "read")

      this.setState({allBooks: books})
      this.setState({currentlyReading: currentlyReading})
      this.setState({wantToRead: wantToRead})
      this.setState({read: read})
    })
   

    // Consulted: https://www.w3schools.com/tags/att_select_disabled.asp
    // Consulted: https://www.w3schools.com/jsref/met_element_removeattribute.asp
    // selectTags.forEach(function(element) {
    // element.removeAttribute('disabled');
    // }
    
  }


  render() {
    console.log(this.state.read)
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

let selectTags = Array.from(document.getElementsByTagName('select'));
function enableSelect () {
  selectTags.forEach(function(element) {
      element.removeAttribute('disabled')
    })
  }

  window.addEventListener('load', enableSelect())


export default App