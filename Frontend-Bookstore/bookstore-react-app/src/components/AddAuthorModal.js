import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FloatingAlert from './FloatingAlert';

const AddAuthorModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('biography', biography);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('http://localhost:5000/author', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add author');
      }

      onAdd();
      setAlert({ message: 'Author added successfully', type: 'success' });
      setName('');
      setBiography('');
      setImage(null);
      onClose();
    } catch (error) {
      console.error('Error adding author:', error);
      setAlert({ message: 'Failed to add author', type: 'error' });
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded p-8">
        <h2 className="text-xl font-bold mb-4">Add New Author</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biography</label>
            <textarea
              id="biography"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded py-2 px-4 w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </form>
      </div>
      {alert && (
        <FloatingAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

AddAuthorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddAuthorModal;
