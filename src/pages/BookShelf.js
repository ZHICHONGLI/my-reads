import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';
import * as BooksAPI            from '../BooksAPI';
import BookComponent            from '../components/BookComponent';

class BookShelf extends Component {
  constructor(props) {
    super(props)
  };
  state = {
    bookShelf: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      console.log(res);
      this.setState({bookShelf: res})
    })
  };
  
  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(res => {
      BooksAPI.getAll().then(res => {
        this.setState({bookShelf: res})
      });
    });
  };

  render() {
    return (
      <div>
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
                {
                  this.state.bookShelf.map((book, index) => ( book.shelf === "currentlyReading" &&
                    <li key={index}>
                      <BookComponent
                        book={book}
                        handleChange={(book,shelf)=>this.changeShelf(book, shelf)}
                      />
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  this.state.bookShelf.map((book, index) => (
                    book.shelf === "wantToRead" &&
                    <li key={index}>
                      <BookComponent
                        book={book}
                        handleChange={(book,shelf)=>this.changeShelf(book, shelf)}
                      />
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  this.state.bookShelf.map((book, index) => (
                    book.shelf === "read" &&
                    <li key={index}>
                      <BookComponent
                        book={book}
                        handleChange={(book,shelf)=>this.changeShelf(book, shelf)}
                      />
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )}
      </div>
    );
  }
}

export default BookShelf;