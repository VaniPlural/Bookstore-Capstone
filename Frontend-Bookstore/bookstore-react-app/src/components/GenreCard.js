import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const GenreCard = ({ genre_name, onEdit }) => {
    // Placeholder image URL
    const placeholderImage = 'https://via.placeholder.com/150';
    return (
        <div className="border border-gray-600 rounded-lg overflow-hidden shadow-lg p-4 m-4 max-w-sm">
         
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{genre_name}</h2>
            
            
            <p className="text-sm text-gray-600 mb-2">
              <strong>Genre Name:</strong> {genre_name}
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
    
    export default GenreCard;
    