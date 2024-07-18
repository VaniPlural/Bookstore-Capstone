import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditAuthorModal from './EditAuthorModal';

const AuthorCard = ({ author, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    //onEdit(author); // Call onEdit function with author object
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedAuthor) => {
    onEdit(updatedAuthor); // Call onEdit function with updated author object
    setIsModalOpen(false);
  };

  return (
    <div className="border rounded-lg hover:shadow-blue-400 hover:shadow-lg p-4 m-4 w-40">
      <img src={'http://localhost:5000'+author.imageUrl} alt={author.name} className="w-26 h-24 mx-auto mb-4" />
      <h4 className="text-sm text-slate-600 font-bold font-small mb-2">{author.name}</h4>
      <p className="text-xs">{author.biography}</p>
      <div className="flex justify-end hover:shadow-blue-500 mt-4 space-x-4">
        <button onClick={handleEditClick} className="text-slate-500 rounded-full hover:shadow hover:text-slate-700 hover:text-slate-800"><FaEdit /></button>
        <button onClick={() => onDelete(author.author_id)} className="rounded-full text-red-400 hover:text-red-700"><FaTrash /></button>
      </div>
      {isModalOpen && (
        <EditAuthorModal
          author={author}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AuthorCard;
