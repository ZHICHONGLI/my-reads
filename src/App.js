import React            from 'react';
import {Route}          from 'react-router-dom';
import * as BooksAPI    from './BooksAPI';
import SearchPage       from './pages/SearchPage.js';
import BookShelf        from './pages/BookShelf.js';
import                       './App.css';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchPage
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
