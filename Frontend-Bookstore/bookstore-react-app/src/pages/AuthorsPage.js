import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthorCard from '../components/AuthorCard';
import AddAuthorModal from '../components/AddAuthorModal';
import FloatingAlert from '../components/FloatingAlert';
import EditAuthorModal from '../components/EditAuthorModal'; // Ensure EditAuthorModal is imported

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [editAuthor, setEditAuthor] = useState(null); // State to hold author being edited
  const [alert, setAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(8); // Number of authors to display per page

  // Fetch authors from API
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:5000/authors');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors(); // Fetch authors on component mount
  }, []);

  // Pagination
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAddAuthor = () => {
    setAddModalOpen(true);
  };

  const handleAddSuccess = () => {
    fetchAuthors(); // Refresh authors after adding a new one
    showAlert('Author added successfully', 'success');
  };

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleEditAuthor = (author) => {
    setEditAuthor(author);
    setEditModalOpen(true);
  };

  const handleEditSuccess = (updatedAuthor) => {
    const updatedAuthors = authors.map(a => (a.author_id === updatedAuthor.author_id ? updatedAuthor : a));
    setAuthors(updatedAuthors);
    showAlert('Author updated successfully', 'success');
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditAuthor(null);
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:5000/author/${authorId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete author');
      }

      const filteredAuthors = authors.filter(a => a.author_id !== authorId);
      setAuthors(filteredAuthors);
      showAlert('Author deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting author:', error);
      showAlert('Failed to delete author', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Layout>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddAuthor}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Author
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {currentAuthors.map(author => (
          <AuthorCard
            key={author.author_id}
            author={author}
            onEdit={handleEditAuthor} // Pass onEdit function to AuthorCard
            onDelete={handleDeleteAuthor}
          />
        ))}
      </div>

      {addModalOpen && (
        <AddAuthorModal
          isOpen={addModalOpen}
          onClose={handleAddClose}
          onAdd={handleAddSuccess}
        />
      )}

      {editModalOpen && editAuthor && (
        <EditAuthorModal
          author={editAuthor}
          onClose={handleEditClose}
          onSave={handleEditSuccess}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap border border-gray-300">
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-l">
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(authors.length / authorsPerPage) }, (_, i) => (
              <li
                key={i}
                className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700"
              >
                <button
                  className={`page-link ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(authors.length / authorsPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {alert && (
        <FloatingAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </Layout>
  );
};

export default AuthorsPage;
