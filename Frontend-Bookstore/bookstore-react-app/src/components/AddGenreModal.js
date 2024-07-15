import React, { useState } from 'react';

const AddGenreModal = ({ onClose, onSave }) => {
  const [genreName, setGenreName] = useState('');

  const handleSave = () => {
    const newGenre = {
      genre_name: genreName,
    };
    onSave(newGenre);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Genre</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Genre Name</label>
          <input
            type="text"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGenreModal;
