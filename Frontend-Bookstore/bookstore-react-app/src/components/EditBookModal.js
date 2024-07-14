import React, { useState, useEffect } from 'react';

const EditBookModal = ({ isOpen, onClose, book, onSave, authors, genres }) => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthorId(book.author.id);
      setGenreId(book.genre.id);
      setPrice(book.price);
      setPublicationDate(book.publication_date);
    }
  }, [book]);

  const handleSave = () => {
    const editedBook = {
      id: book.id,
      title,
      authorId,
      genreId,
      price,
      publication_date: publicationDate,
    };
    onSave(editedBook);
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Edit Book</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
            <select
              id="author"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              <option value="">Select Author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
            <select
              id="genre"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            >
              <option value="">Select Genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="text"
              id="price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Publication Date:</label>
            <input
              type="text"
              id="publicationDate"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
