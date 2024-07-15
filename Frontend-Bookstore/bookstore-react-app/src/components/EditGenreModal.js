import React, { useState } from 'react';

const EditGenreModal = ({ genre, onClose, onSave }) => {
  const [genreName, setGenreName] = useState(genre.genre_name);

  const handleSave = () => {
    const updatedGenre = { ...genre, genre_name: genreName };
    onSave(updatedGenre);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Genre</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Genre Name
          </label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
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

export default EditGenreModal;
