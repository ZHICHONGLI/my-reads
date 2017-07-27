import React, { Component }   from 'react';
import * as BooksAPI          from '../BooksAPI.js';
import { Link }               from 'react-router-dom';
import BookComponent             from '../components/BookComponent';

class SearchPage extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    bookShelf: [],
    searchResult: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({bookShelf: res});
    });
  }
  
  searchBooks(query, results) {
    if(!query) {
      this.setState({searchResult: []})
    }else {
      BooksAPI.search(query, results).then(books => {
        if(books.error || !books) {
            this.setState({searchResult: []})
        }else{
          this.setState({
            searchQuery: this.state.searchQuery,
            searchResult: books
          });
        }
      })
    }
  };

  handleChange(book, shelf) {
    const idx = this.state.searchResult.indexOf(book);
    this.state.searchResult[idx].shelf = shelf;
    this.setState({searchResult :this.state.searchResult});
    BooksAPI.update(book, shelf).then(res =>{
    })
  };

  render() {
    let books = this.state.searchResult;
    return (
      <div className="search-books">      
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <form>
              <input
                onChange={event => this.searchBooks(event.target.value, 20)}
                type="text"
                placeholder="Search by title or author"/>
            </form>
          </div>
        </div>
        <div className="search-books-results bookdhelf-books">
          <ol className="books-grid">
            { books.length ?             
              books.map((book, index) => {
                this.state.bookShelf.map(bookItem => {
                  if (book.id === bookItem.id) {
                    book.shelf = bookItem.shelf;
                  }
                })
                return (
                <li key={index}>
                  <BookComponent
                    book={book}
                    handleChange={(book, shelf)=>this.handleChange(book, shelf)}
                  />
                </li> )
              })
              :
              <div>No Results</div>      
            }
          </ol>  
        </div>
      </div>
    );
  }
}

export default SearchPage;