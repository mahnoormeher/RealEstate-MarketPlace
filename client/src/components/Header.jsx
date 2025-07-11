import React, { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-blue-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 relative">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-600">Estate</span>
            <span className="text-blue-800">Ease</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-blue-50 p-3 rounded-lg items-center hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-700" />
          </button>
        </form>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-4 items-center">
          <Link to="/">
            <li className="text-blue-800 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-blue-800 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="text-blue-800 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-xl text-blue-800" />
          </button>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-16 right-3 bg-white shadow-md rounded-md p-4 z-10 flex flex-col gap-3 min-w-[120px]">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <span className="text-blue-800">Home</span>
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                <span className="text-blue-800">About</span>
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                {currentUser ? (
                  <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
                ) : (
                  <span className="text-blue-800">Sign In</span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
