import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center p-6 sidebar-container gap-y-10 ">
      <div className="logo-container">
        <h1 className="text-4xl font-bold">Contact Manager</h1>
      </div>
      <ul className="flex flex-col w-full menu-list gap-y-3">
        <Link
          to="/"
          className="px-4 py-2 text-white rounded-md hover:shadow-lg bg-primary-bg menu-item"
        >
          Contacts
        </Link>
        <Link
          to="/charts"
          className="px-4 py-2 text-white rounded-md hover:shadow-lg bg-primary-bg menu-item"
        >
          Charts And Maps
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
