import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';



const BookCard = ({ title, author, genre, price, publicationDate, imageUrl, onEdit }) => {
  
  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/150';
console.log(imageUrl);
  


  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden shadow-lg p-4 m-4 max-w-sm">
      <div className="relative h-48">
        <img
        //src={"/public/bookscreen1.jpg"}
          src={imageUrl || placeholderImage}  // Use provided imageUrl or fallback to placeholder
          alt="Book Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Author:</strong>{' '}
          <Link
            to={`/authors/${author}`}
            className="text-blue-500 hover:underline"
          >
            {author}
          </Link>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Genre:</strong>{' '}
          <Link to="/genres" className="text-blue-500 hover:underline">
            {genre}
          </Link>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Price:</strong> ${price}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Publication Date:</strong> {publicationDate}
        </p>
        <div className="flex justify-end space-x-2">
          
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onEdit}
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button  className="text-gray-600 hover:text-gray-900">
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
