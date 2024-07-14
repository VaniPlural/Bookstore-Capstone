import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8); // Number of books to display per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books/');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Calculate number of pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-wrap justify-center">
        {currentBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author.name}
            genre={book.genre.genre_name}
            price={book.price}
            publicationDate={book.publication_date}
            imageUrl="https://via.placeholder.com/100"
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap border border-gray-300">
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-l">
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700">
                <button
                  className={`page-link ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default BooksPage;
