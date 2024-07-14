import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const BookCard = ({ title, author, genre, price, publicationDate, imageUrl, onEdit }) => {
  const handleEditClick = () => {
    // Trigger the edit action using the onEdit prop
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="border rounded shadow-lg p-4 m-4 w-80">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex">
        <img src={imageUrl} alt="Book Cover" className="w-24 h-32 mr-4" />
        <div className="flex-grow">
          <p><strong>Author:</strong> <Link to={`/authors/${author}`} className="text-blue-500 hover:underline">{author}</Link></p>
          <p><strong>Genre:</strong> <Link to="/genres" className="text-blue-500 hover:underline">{genre}</Link></p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Publication Date:</strong> {publicationDate}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button className="text-blue-500 hover:text-blue-700" onClick={handleEditClick}><FaEye /></button>
        <button className="text-green-500 hover:text-green-700" onClick={handleEditClick}><FaEdit /></button>
        <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
      </div>
    </div>
  );
};

export default BookCard;
