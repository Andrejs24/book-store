"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';



interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
}
const username = 'admin';
const password = 'admin123';

export default function Admin() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showBooks, setShowBooks] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleToggleBooks = () => {
    if (showBooks) {
      setShowBooks(false);
    } else {
      axios.get<Book[]>('http://localhost:8080/books')
        .then(response => {
          setBooks(response.data.reverse());
          setShowBooks(true);
          setCurrentPage(1);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  };

  const handleAddBook = () => {
    // Send a POST request to add a new book
    axios.post('http://localhost:8080/admin/books', {
      title: title,
      author: author,
      description: description,
      price:price,
    },{
      auth:{username: username,
        password : password,
      }
    })
      .then(response => {
        // Refresh the book list after adding a new book
        handleToggleBooks();
        // Clear the input fields
        setTitle('');
        setAuthor('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };
  const itemsPerPage = 50; // Number of books per page


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, books.length);
  const currentBooks = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="admin_bookstore_container">
        <div className="addBookSection">
          <h2>Add Book</h2>
          <div className="inputFields">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button onClick={handleAddBook} className='button-link'>Add</button>
        </div>
 

      <div className="user_bookstore_container">
        <h1>Bookstore</h1>
        <button onClick={handleToggleBooks} className='button-link'>
          {showBooks ? 'Hide Books' : 'Show Books'}
        </button>
        <div className='List_of_books_table'>
          {showBooks && (
            <div className="bookList">
              {currentBooks.map((book) => (
                <div className="book" key={book.id}>
                  <strong>Title:</strong> {book.title}<br />
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Description:</strong> {book.description}<br />
                  <strong>Price:</strong>{book.price}<br />
                </div>
              ))}
            </div>
          )}
        </div>
        {showBooks && (
          <div className="pagination">
            {paginationButtons}
          </div>
        )}
      </div>
    </div>
  );
}
