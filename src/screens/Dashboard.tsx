import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen sm:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-50 w-screen bg-gray-50 bg-opacity-30 transition duration-300 ease-out transform ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 sm:static sm:w-1/5 sm:flex-shrink-0 sm:overflow-y-auto`}
          onClick={toggleSidebar}
        >
          <div className="w-64 h-full md:w-auto bg-sidebar-bg">
            <Sidebar />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-grow ">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-primary-bg sm:px-8">
            <div>
              <button
                className="text-gray-500 sm:hidden hover:text-gray-600 focus:outline-none focus:text-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showSidebar ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div className="flex items-center text-2xl font-bold text-white">
              Header
            </div>
          </div>
          <div className="h-full p-4 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
