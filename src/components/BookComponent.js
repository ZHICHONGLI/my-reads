import React from 'react';

  const BookComponent = ({book, handleChange}) => {
    const onChange = event => {
      handleChange(book, event.target.value);
    };
    return (book &&
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128, height: 174, backgroundImage: `url(${book?book.imageLinks.smallThumbnail:null})`}}>
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={onChange}>
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

export default BookComponent;