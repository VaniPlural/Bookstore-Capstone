import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AuthorCard from '../components/AuthorCard';
import EditAuthorModal from '../components/EditAuthorModal';

const AuthorsPage = () => {
    const [authors, setAuthors] =useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const prefix="http://localhost:5000";

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:5000/authors/');
        if (!response.ok) {
          throw new Error('Failed to fetch Authors');
        }
        const data = await response.json();
        setAuthors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Authors:', error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const openEditModal = (author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  const handleSave = (editedAuthor) => {
    // Update the authors state with the edited author
    const updatedAuthors = authors.map((author) =>
      author.name === editedAuthor.name ? editedAuthor : author
    );
    setAuthors(updatedAuthors);
  };

  const sortedAuthors = [...authors].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } 
   /* else if (sortBy === 'author') {
      return a.author.name.localeCompare(b.author.name);
    } else if (sortBy === 'price') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === 'publication_date') {
      return new Date(a.publication_date) - new Date(b.publication_date);
    } else if (sortBy === 'genre') {
      return a.genre.genre_name.localeCompare(b.genre.genre_name);
    } */
    
    return 0;
  });

  const filteredAuthors = sortedAuthors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);
  

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
            Add Author
          </button>
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 rounded py-2 px-4"
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
            className="border border-gray-300 rounded py-2 px-4"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="name">Name</option>
            
          </select>
        </div>
        </div>

        <div className="flex flex-wrap justify-center">
        {currentAuthors.map((author, index) => (
          <AuthorCard
            key={index}
            name={author.name}
            biography={author.biography}
            imageUrl=  {prefix.concat(author.imageUrl)}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
            onEdit={() => openEditModal(author)}
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

      <EditAuthorModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        author={selectedAuthor}
      />

    </Layout>
  );
};

export default AuthorsPage;
