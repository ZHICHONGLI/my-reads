import React, { Component } from 'react';

class BookComponent extends Component {
  constructor(props) {
    super(props)
  };
  onChange(event) {
    this.props.handleChange(this.props.book, event.target.value);
  };
  render() {
    const {book} = this.props; 
    return (book &&
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book?book.imageLinks.smallThumbnail:null})`}}></div>
          
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.onChange.bind(this)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
          {book.authors &&
            book.authors.map(author => (
              <div className="book-authors" key={author}>{author}</div>
            ))
          }
        </div>
    );
  }
}

export default BookComponent;