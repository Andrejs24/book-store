"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  language: string;
  bookCount: number;
}

interface Book {
  id: number;
  title: string;
  author: Author;
  description: string;
}

const itemsPerPage = 50; // Number of books per page

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showBooks, setShowBooks] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleBooks = () => {
    if (showBooks) {
      setShowBooks(false);
    } else {
      axios.get<Book[]>('http://localhost:8080/books')
        .then(response => {
          setBooks(response.data.reverse()); // Reverse the order of books
          setShowBooks(true);
          setCurrentPage(1); // Reset to the first page when showing books
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  };

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
              <strong>Author:</strong> {book.author.firstName} {book.author.lastName}<br />
              <strong>Description:</strong> {book.description}<br />
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
  );
}
