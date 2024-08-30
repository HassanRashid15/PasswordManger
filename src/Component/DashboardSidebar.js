import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";
import { PiVinylRecordFill } from "react-icons/pi";
import { RiBarChartFill } from 'react-icons/ri';

function DashboardSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const mainLinks = [
    { icon: <FaHome />, name: 'Overview', href: '/dashboard' },
    { icon: <RiBarChartFill />, name: 'Tables', href: '/dashboard/table' },
    { icon: <CgProfile />, name: 'Profile', href: '/dashboard/profile' },
    { icon: <PiVinylRecordFill />, name: 'Record', href: '/dashboard/record' },
  ];

  const bottomLinks = [
    { icon: <IoSettingsSharp />, name: 'Setting', href: '/dashboard/setting' },
  ];

  return (
    <div
      className={`bg-gray-900 text-gray-200 w-64 fixed top-0 left-0 z-50 h-full transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full ' 
      } transition-transform duration-300 alignment-custom-box md:relative md:translate-x-0 md:h-auto`}
    >
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-xl font-bold text-white">TeamPassword</h1>
        <button onClick={toggleSidebar}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <h1 className="text-2xl font-bold p-4 text-white hidden md:block">TeamPassword</h1>

      <nav className="p-4">
        <ul className="space-y-4">
          {mainLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`flex items-center px-4 py-2 text-lg font-medium rounded hover:bg-gray-700 ${
                  location.pathname === link.href ? 'bg-gray-700 text-white' : ''
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="border-t border-gray-700 my-4"></div> */}
     
        <ul className="space-y-4 px-4 absolute bottom-0 w-full mb-3">
          {bottomLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`flex items-center px-4 py-2 text-lg font-medium rounded hover:bg-gray-700 ${
                  location.pathname === link.href ? 'bg-gray-700 text-white' : ''
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default DashboardSidebar;
