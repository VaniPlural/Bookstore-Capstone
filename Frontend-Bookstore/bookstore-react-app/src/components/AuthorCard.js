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
    <div className="border rounded shadow-lg p-4 m-4 w-80">
      <img src={author.imageUrl} alt={author.name} className="w-24 h-32 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2">{author.name}</h2>
      <p>{author.biography}</p>
      <div className="flex justify-end mt-4 space-x-4">
        <button onClick={handleEditClick} className="text-green-500 hover:text-green-700"><FaEdit /></button>
        <button onClick={() => onDelete(author.author_id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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
