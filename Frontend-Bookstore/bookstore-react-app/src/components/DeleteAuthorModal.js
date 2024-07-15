import React from 'react';
import PropTypes from 'prop-types';

const DeleteAuthorModal = ({ author, onDelete, onClose }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/author/${author.author_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete author');
      }

      onDelete(author.author_id);
      onClose();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-8">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete {author.name}?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

DeleteAuthorModal.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteAuthorModal;
