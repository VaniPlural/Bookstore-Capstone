import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books/');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        console.log(data);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
        {books.map((book) => (
          <BookCard
            key={book.title}
            title={book.title}
            author={book.author.name}
            genre={book.genre.genre_name}
            price={book.price}
            publicationDate={book.publication_date}
            imageUrl="https://via.placeholder.com/100"
          />
        ))}
      </div>
    </Layout>
  );
};

export default BooksPage;
