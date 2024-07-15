import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import GenreCard from '../components/GenreCard';
import EditGenreModal from '../components/EditGenreModal';
const GenresPage = () => {

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [genresPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  //const prefix = "../../../Backend-Bookstore/";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/genres/');
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

  const openEditModal = (genre) => {
    setSelectedGenre(genre);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedGenre(null);
  };


  const handleSave = (editedGenre) => {
    // Update the books state with the edited book
    const updatedGenres = genres.map((genre) =>
    genre.genre_name === editedGenre.genre_name ? editedGenre : genre
    );
    setGenres(updatedGenres);
  };

  const sortedGenres = [...genres].sort((a, b) => {
    if (sortBy === 'genre_name') {
      return a.genre_name.localeCompare(b.genre_name);
    } 
    return 0;
  });

  const filteredGenres = sortedGenres.filter(genre =>
    genre.genre_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGenres.length / genresPerPage);

  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = filteredGenres.slice(indexOfFirstGenre, indexOfLastGenre);
  

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
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
       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="mb-2 md:mb-0 md:flex md:space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Genre
          </button>
          <input
            type="text"
            placeholder="Search by name"
            className="border border-indigo-300 rounded py-2 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4">
            Search
          </button>
        </div>
        <div className="md:ml-auto">
          <label className="mr-2">Sort by:</label>
          <select
            className="border border-indigo-300 rounded py-2 px-4"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="genre_name">Name</option>
           
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {currentGenres.map((genre, index) => (
          <GenreCard
            key={index}
            genre_name={genre.genre_name}
            
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
            onEdit={() => openEditModal(genre)}
          />
        
        ))
        }
      </div>












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
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700">
                <button
                  className={`page-link ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
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
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>


      <EditGenreModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        genre={selectedGenre}
      />

    </Layout>
  );
};

export default GenresPage;
