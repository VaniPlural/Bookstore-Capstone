import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Layout from '../components/Layout';
import EditGenreModal from '../components/EditGenreModal';
import AddGenreModal from '../components/AddGenreModal';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/genres');
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleEdit = (genre) => {
    setCurrentGenre(genre);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleDelete = (genre) => {
    setGenreToDelete(genre);
    setShowDeleteDialog(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setCurrentGenre(null);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setGenreToDelete(null);
  };

  const handleSaveGenre = async (updatedGenre) => {
    try {
      const response = await fetch(`http://localhost:5000/genre/${updatedGenre.genre_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGenre),
      });

      if (!response.ok) {
        throw new Error('Failed to update genre');
      }

      const updatedGenres = genres.map((genre) =>
        genre.genre_id === updatedGenre.genre_id ? updatedGenre : genre
      );
      setGenres(updatedGenres);
      handleCloseModal();

      // Show success alert
      setAlertMessage('Genre edited successfully');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating genre:', error);

      // Show error alert
      setAlertMessage('Failed to edit genre');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  };

  const handleAddGenre = async (newGenre) => {
    try {
      const response = await fetch('http://localhost:5000/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGenre),
      });

      if (!response.ok) {
        throw new Error('Failed to add genre');
      }

      const addedGenre = await response.json();
      setGenres([...genres, addedGenre]);
      setShowAddModal(false);

      // Show success alert
      setAlertMessage('Genre added successfully');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding genre:', error);

      // Show error alert
      setAlertMessage('Failed to add genre');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  };

  const confirmDeleteGenre = async () => {
    try {
      const response = await fetch(`http://localhost:5000/genre/${genreToDelete.genre_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete genre');
      }

      const updatedGenres = genres.filter(
        (genre) => genre.genre_id !== genreToDelete.genre_id
      );
      setGenres(updatedGenres);
      handleCloseDeleteDialog();

      // Show success alert
      setAlertMessage('Genre deleted successfully');
      setAlertType('success');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting genre:', error);

      // Show error alert
      setAlertMessage('Failed to delete genre');
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Manage Genres</h1>
        {alertMessage && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
              alertType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {alertMessage}
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleAdd}
        >
          Add Genre
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Genre ID</th>
                <th className="py-2 px-4 border-b text-left">Genre Name</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre) => (
                <tr key={genre.genre_id}>
                  <td className="py-2 px-4 border-b text-left">{genre.genre_id}</td>
                  <td className="py-2 px-4 border-b text-left">{genre.genre_name}</td>
                  <td className="py-2 px-4 border-b text-left">
                    <button
                      onClick={() => handleEdit(genre)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(genre)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditModal && (
          <EditGenreModal
            genre={currentGenre}
            onClose={handleCloseModal}
            onSave={handleSaveGenre}
          />
        )}
        {showAddModal && (
          <AddGenreModal
            onClose={handleCloseModal}
            onSave={handleAddGenre}
          />
        )}
        {showDeleteDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete the genre "{genreToDelete.genre_name}"?</p>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseDeleteDialog}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={confirmDeleteGenre}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GenresPage;
