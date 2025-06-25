import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { tutorials } from '../pages/Tutorial'; // Import tutorials array
import './Navbar.css';

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = tutorials.filter(
      (tutorial) =>
        tutorial.title.toLowerCase().includes(query) ||
        tutorial.description.toLowerCase().includes(query) ||
        tutorial.category.toLowerCase().includes(query) ||
        tutorial.tags.some((tag) => tag.toLowerCase().includes(query))
    );
    setSearchResults(results);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search result click
  const handleResultClick = (category) => {
    setSearchResults([]);
    setSearchQuery('');
    navigate(`/tutorials/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
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
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search tutorials"
            aria-describedby="search-help"
          />
          <i className="fas fa-search"></i>
          <span id="search-help" className="sr-only">Search for tutorials by title, description, category, or tags</span>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((tutorial) => (
              <div
                key={tutorial.id}
                className="search-result-item"
                onClick={() => handleResultClick(tutorial.category)}
                role="option"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleResultClick(tutorial.category)}
              >
                <strong>{tutorial.title}</strong> ({tutorial.category})
                <p>{tutorial.description.substring(0, 100)}...</p>
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
