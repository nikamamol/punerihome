import React from 'react';
import Header from '../layout/Header/Header';


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
  
      <main className="flex-grow">
        {children}
      </main>

    </div>
  );
};

export default Layout;