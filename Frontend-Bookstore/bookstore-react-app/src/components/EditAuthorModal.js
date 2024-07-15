import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FloatingAlert from './FloatingAlert';

const EditAuthorModal = ({ author, onClose, onSave }) => {
  const [name, setName] = useState(author.name);
  const [biography, setBiography] = useState(author.biography);
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setName(author.name);
    setBiography(author.biography);
    setImageFile(null); // Reset image file on new author edit
    setAlert(null); // Clear alert on modal open
  }, [author]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('biography', biography);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`http://localhost:5000/author/${author.author_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update author');
      }

      const updatedAuthor = await response.json();
      onSave(updatedAuthor);
      onClose();
      showAlert('Author updated successfully', 'success');
    } catch (error) {
      console.error('Error updating author:', error);
      onClose();
      showAlert('Failed to update author', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-8 w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Author</h2>
        {alert && <FloatingAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Biography</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

EditAuthorModal.propTypes = {
  author: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAuthorModal;
