<header className="bg-blue-100 shadow-md">
  <div className="max-w-6xl mx-auto p-3">
    <div className="flex justify-between items-center flex-wrap gap-3">
      {/* Logo */}
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-blue-600">Estate</span>
          <span className="text-blue-800">Ease</span>
        </h1>
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-2 rounded-lg flex items-center flex-1 sm:flex-initial"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-full"
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

      {/* Mobile Menu Icon */}
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="text-xl text-blue-800" />
        </button>
      </div>
    </div>

    {/* Mobile Dropdown Menu */}
    {menuOpen && (
      <div className="sm:hidden mt-3 bg-white shadow-md rounded-md p-4 flex flex-col gap-3 z-10">
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
</header>
