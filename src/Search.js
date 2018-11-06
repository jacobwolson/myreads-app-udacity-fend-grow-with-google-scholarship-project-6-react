import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {

    state = {
        searchResults: []
    }
   

    updateSearchResults = (query) => {
        if(query.length > 0) {
            BooksAPI.search(query).then((matches) => {
                // if (matches === undefined) {
                //     this.setState({searchResults: ''})
                 if (matches.error) {
                    this.setState({searchResults: ''})
                } else {
                    this.setState({searchResults: matches})
                }
            })
        } else {
            this.setState({searchResults: ''})
        }
    }

    reconcileShelfAssignment = (thisBook) => {
        let bookHasShelf;
        bookHasShelf = this.props.allBooks.filter(eachBook => eachBook.id === thisBook.id)
        if (bookHasShelf[0] === undefined) {
            return "move"
        } else {
            return bookHasShelf[0].shelf
        }
    }

      render () {
        
        if(this.state.searchResults) {
            this.state.searchResults.sort(sortBy('title'))
        }

        return(
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                    > Bookshelf </Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input 
                    type="text" 
                    placeholder="Search by title or author"
                    // value={this.state.searchResults}
                    onChange={(event) => this.updateSearchResults(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <div className="bookshelf">
                      <h2 className="bookshelf-title">Search Results</h2>
                      <div className="bookshelf-books">
                      {this.state.searchResults.length !== 0 && (
                          // Consulted: StackOverflow answer by nem035; https://stackoverflow.com/questions/44849206/react-js-syntax-error-this-is-a-reserved-word-in-render-function
                          <ol className="books-grid">   
                                {this.state.searchResults.map((book) => (
                                  <li key={book.id} className="search-result-list-item">
                                      <div className="book">
                                      <div className="book-top">
                                          {book.imageLinks !== undefined && ( 
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                          )}
                                          <div className="book-shelf-changer" 
                                            onClick={() => this.props.addToAllBooks(book.id, book)} 
                                            onChange={e => {
                                              this.props.updateShelf(book.id, e.target.value);
                                              this.props.navigateToHome()
                                            }}
                                          >
                                          <select defaultValue={this.reconcileShelfAssignment(book)}>
                                              <option value="move">Move to...</option>
                                              <option value="currentlyReading">Currently Reading</option>
                                              <option value="wantToRead">Want to Read</option>
                                              <option value="read">Read</option>
                                              <option value="none">None</option>
                                          </select>
                                          </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {book.authors !== undefined && (
                                            <div className="book-authors">{book.authors.map((author) => (<span key={author}>{author} </span>))}</div>
                                        )}
                                        </div>
                                  </li>
                                  )
                                )}      
                          </ol>
                        )}
                      </div>
                  </div>
                </ol>
              </div>
            </div>
        )
    }

}

export default Search