import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class ListBooks extends Component {
    
    render() {
        
        const { allBooksInPlay, updateShelf } = this.props

        return (
            <div className="list-books">
                
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                <div>
                
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {allBooksInPlay.filter(book => book.shelf === 'currentlyReading').map((book) => (
                                <li key={book.title} className="currently-reading-list-item">
                                    <div className="book">
                                    <div className="book-top">
                                        {book.imageLinks !== undefined && ( 
                                            <div 
                                                className="book-cover" 
                                                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                                            </div>
                                        )}  
                                        <div className="book-shelf-changer">
                                        {/* Consulted: setting state based on changed value of select tag: answer by jmac; 
                                            https://stackoverflow.com/a/41229938 */}
                                        <select onChange={(e) => updateShelf(e.target.value, book)}>
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
                    </div>
                </div>
                
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {allBooksInPlay.filter(book => book.shelf === 'wantToRead').map((book) => (
                                <li key={book.title} className="want-to-read-list-item">
                                    <div className="book">
                                    <div className="book-top">
                                        {book.imageLinks !== undefined && ( 
                                            <div 
                                                className="book-cover" 
                                                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                                            </div>
                                        )}
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => updateShelf(e.target.value, book)}>
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
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {allBooksInPlay.filter(book => book.shelf === 'read').map((book) => (
                                <li key={book.title} className="read-list-item">
                                    <div className="book">
                                    <div className="book-top">
                                        {book.imageLinks !== undefined && ( 
                                            <div 
                                                className="book-cover" 
                                                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                                            </div>
                                        )}
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => updateShelf(e.target.value, book)}>
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
                    </div>
                </div>

            </div>
            </div>
            <div className="open-search">
            <Link 
                to="/search" 
            > Search for Books </Link>
            </div>
        </div>
      )
    }
  }
  
  export default ListBooks
  