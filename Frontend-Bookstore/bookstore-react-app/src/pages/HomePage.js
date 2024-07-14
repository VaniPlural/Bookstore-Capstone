import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-2">Welcome, Administrators!</h2>
          <p>
            Our bookstore management system provides administrators with the tools to efficiently manage books, authors, and genres. Keep track of inventory, update book information, and maintain author and genre records seamlessly. Our user-friendly interface ensures that you can easily navigate through the system and make necessary updates to keep our bookstore running smoothly.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <img src="bookscreen1.jpg" alt="Placeholder" className="w-full md:w-4/5" />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
