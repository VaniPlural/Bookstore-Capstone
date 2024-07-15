import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddBookModal = ({ isOpen, onClose, onSave }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    authorId: '',
    genreId: '',
    price: '',
    publication_date: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAuthorsAndGenres = async () => {
      try {
        const [authorsResponse, genresResponse] = await Promise.all([
          fetch('http://localhost:5000/get/authors'),
          fetch('http://localhost:5000/get/genres')
        ]);

        if (!authorsResponse.ok || !genresResponse.ok) {
          throw new Error('Failed to fetch authors or genres');
        }

        const authorsData = await authorsResponse.json();
        const genresData = await genresResponse.json();

        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching authors or genres:', error);
      }
    };

    fetchAuthorsAndGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBook(prevState => ({
      ...prevState,
      image: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(newBook);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto z-10">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Book</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <select
                name="authorId"
                value={newBook.authorId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
              <select
                name="genreId"
                value={newBook.genreId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.genre_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={newBook.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Publication Date</label>
              <input
                type="date"
                name="publication_date"
                value={newBook.publication_date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Book Cover Preview"
                  className="mt-2 w-32 h-40 object-cover"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
