import React, { Component }   from 'react';
import * as BooksAPI          from '../BooksAPI.js';

class SearchPage extends Component {

  constructor(props) {
    super(props);
    // this.searchPage = this.props.searchPage(event);
  };

  state = {
    searchQuery: "",
    searchResult: []
  };

  searchBooks(query, results) {
    this.setState({searchQuery: query});
    BooksAPI.search(query, results).then(books => {
      this.setState({
        searchQuery: this.state.searchQuery,
        searchResult: books
      });
      console.log(this.state.searchResult);
    })
  };

  render() {
    let books = this.state.searchResult;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
        <div className="search-books-results">
            { books.map(book => {
              <ol className="books-grid">
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.map(author => {
                    return {author}
                  })}
                  </div>
                </div>
              </ol>
            })}
          
        </div>
        {this.state.searchResult.error && <p>No Result</p>}
      </div>
    );
  }
}

export default SearchPage;