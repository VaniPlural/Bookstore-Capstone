import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-center text-2xl">Welcome to Inkwell!!</h1>
        </header>

      <nav className="bg-gray-700 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/books" className="hover:underline">Books</a>
            <a href="/authors" className="hover:underline">Authors</a>
            <a href="/genres" className="hover:underline">Genres</a>
          </div>
          <div className="block md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className="hidden md:flex space-x-4">
            <input type="text" placeholder="Search..." className="p-2 rounded w-full md:w-auto" />
            <button className="hover:underline">Login</button>
            <button className="hover:underline">Register</button>
          </div>
        </div>
        <div className={`mt-2 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <input type="text" placeholder="Search..." className="p-2 rounded w-full mb-2" />
          <button className="block w-full mb-2 hover:underline">Login</button>
          <button className="block w-full hover:underline">Register</button>
        </div>
      </nav>

      <main className="flex-grow p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2024 My Bookstore "Inkwell"</p>
      </footer>
    </div>
  );
};

export default Layout;
