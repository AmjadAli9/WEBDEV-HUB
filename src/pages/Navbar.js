// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

// Define available pages for search
const pages = [
  { name: 'Home', path: '/' },
  { name: 'CodePad', path: '/codepad' },
  { name: 'Tutorials', path: '/tutorial' },
  { name: 'Resources', path: '/resources' },
  { name: 'Interview Prep', path: '/interview-prep' },
  { name: 'Community', path: '/community' },
  { name: 'Challenges', path: '/devchallenges' },
  { name: 'Project Ideas', path: '/project-idea' },
];

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected result for accessibility
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedIndex(-1); // Reset selection on new input

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = pages.filter((page) =>
      page.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  // Handle keyboard navigation for search results
  const handleKeyDown = (e, path, index) => {
    if (e.key === 'Enter') {
      handleResultClick(path);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Escape') {
      setSearchResults([]);
      setSearchQuery('');
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (path) => {
    setSearchResults([]);
    setSearchQuery('');
    setSelectedIndex(-1);
    navigate(path);
  };

  return (
    <nav className={`edu-navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <NavLink to="/" className="logo">
          <i className="fas fa-graduation-cap"></i> WebDev<span>Hub</span>
        </NavLink>
      </div>

      <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/codepad" onClick={toggleMenu}>CodePad</NavLink>
        <NavLink to="/tutorials" onClick={toggleMenu}>Learn</NavLink>
        <NavLink to="/resources" onClick={toggleMenu}>Resources</NavLink>
        <NavLink to="/interview-prep" onClick={toggleMenu}>Prep</NavLink>
        <NavLink to="/community" onClick={toggleMenu}>Community</NavLink>
        <NavLink to="/devchallenges" onClick={toggleMenu}>Challenges</NavLink>
        <NavLink to="/project-idea" onClick={toggleMenu}>Project Ideas</NavLink>
      </div>

      <div className="navbar-right" ref={searchRef}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search pages"
            aria-describedby="search-help"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' && searchResults.length > 0) {
                e.preventDefault();
                setSelectedIndex(0);
              } else if (e.key === 'Escape') {
                setSearchResults([]);
                setSearchQuery('');
                setSelectedIndex(-1);
              }
            }}
          />
          <i className="fas fa-search"></i>
          <span id="search-help" className="sr-only">Search for available pages like Home, Tutorials, or Resources</span>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results" role="listbox" aria-label="Search results">
            {searchResults.map((page, index) => (
              <div
                key={page.path}
                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleResultClick(page.path)}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, page.path, index)}
              >
                <strong>{page.name}</strong>
              </div>
            ))}
          </div>
        )}
        <button onClick={toggleMode} className="toggle-mode" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {darkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
