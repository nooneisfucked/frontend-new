import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo.png";

const SideBar = () => {
const options = [
  { path: "/", label: "SENDOUT" },
  { path: "/emails", label: "Emails" },
  { path: "/smtps", label: "SMTP" },
  { path: "/letters", label: "Letters" },
  { path: "/logs", label: "Logs" }
];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo and Brand */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-700">
        <img src={Logo} alt="Logo" className="w-12 h-10 rounded-3xl" />
        <span className="text-lg font-bold">Email Sender</span>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 p-4">
        {options.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="block py-2 px-4 rounded hover:bg-gray-700 mb-1"
          >
            {option.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;