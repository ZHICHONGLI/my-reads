import React, { Component }   from 'react';
import * as BooksAPI          from '../BooksAPI.js';
import { Link }               from 'react-router-dom';
import BookComponent             from '../components/BookComponent';

class SearchPage extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    searchQuery: "",
    searchResult: []
  };

  searchBooks(query, results) {
    this.setState({searchQuery: query});
    BooksAPI.search(query, results).then(books => {
      if(books.error) {
          this.setState({searchResult: []})
      }else{
        this.setState({
          searchQuery: this.state.searchQuery,
          searchResult: books
        });
      }
      console.log(this.state.searchResult);
    })
  };

  render() {
    let books = this.state.searchResult;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={event => this.searchBooks(event.target.value, 20)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results bookdhelf-books">
          <ol className="books-grid">
            { books.length ?             
              books.map((book, index) => (
                <li key={index}>
                  <BookComponent
                    book={book}
                  />
                </li>
              ))
              :
              <div>No Results</div>      
            }
          </ol>  
        </div>
        {this.state.searchResult.error && <p>No Result</p>}
      </div>
    );
  }
}

export default SearchPage;