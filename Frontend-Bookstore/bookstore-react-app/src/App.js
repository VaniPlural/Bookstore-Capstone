import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import GenresPage from './pages/GenresPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/authors/:id" component={AuthorsPage} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
       <Route path="/book-details/:id" element={<BookDetailsPage />} />
       <Route path="/add-book" element={<AddBookPage />} />

    </Routes>
  );
}

export default App;
