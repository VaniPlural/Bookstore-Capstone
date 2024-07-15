import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AuthorCard = ({ name, biography, imageUrl, onEdit }) => {
  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden shadow-lg p-4 m-4 max-w-sm">
      <div className="relative h-48">
        <img
          src={imageUrl || placeholderImage}  // Use provided imageUrl or fallback to placeholder
          alt="Author Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        
        <p className="text-sm text-gray-600 mb-2">
          <strong>Name:</strong> {name}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Biography:</strong> {biography}
        </p>
        <div className="flex justify-end space-x-2">
          
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onEdit}
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
