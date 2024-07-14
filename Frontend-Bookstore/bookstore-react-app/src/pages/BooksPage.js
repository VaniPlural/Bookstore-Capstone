import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8); // Number of books to display per page
  const [sortBy, setSortBy] = useState('title'); // Default sort by title
  const [searchTerm, setSearchTerm] = useState('');

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

  // Sorting books based on sortBy criteria
  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.name.localeCompare(b.author.name);
    } else if (sortBy === 'price') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === 'publication_date') {
      return new Date(a.publication_date) - new Date(b.publication_date);
    } else if (sortBy === 'genre') {
      return a.genre.genre_name.localeCompare(b.genre.genre_name);
    }
    return 0;
  });

  // Filter books based on search term
  const filteredBooks = sortedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate number of pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="mb-2 md:mb-0 md:flex md:space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Book
          </button>
          <input
            type="text"
            placeholder="Search by title"
            className="border border-gray-300 rounded py-2 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4">
            Search
          </button>
        </div>
        <div className="md:ml-auto">
          <label className="mr-2">Sort by:</label>
          <select
            className="border border-gray-300 rounded py-2 px-4"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
            <option value="publication_date">Publication Date</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </div>

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
