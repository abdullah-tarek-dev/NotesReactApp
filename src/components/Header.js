import React, { useState, useRef, useEffect } from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = ({ notes = [], onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
    setShowMenu(false);
    setSearchValue('');
    if (onSearch) onSearch('');
  };

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
    setShowSearch(false);
    setSearchValue('');
    if (onSearch) onSearch('');
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  // إغلاق الـ dropdown لو المستخدم ضغط بره
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // focus على الـ input لما يظهر
  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.querySelector('input')?.focus();
    }
  }, [showSearch]);

  return (
    <>
      <header className="header">
        <h1 className="header-title">NOTES</h1>

        <div className="header-details">
          <button title="Search" onClick={handleSearchToggle}>
            <FontAwesomeIcon icon={showSearch ? faTimes : faSearch} />
          </button>
          <button title="More options" onClick={handleMenuToggle}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </header>

      {showSearch && (
        <div className="search-bar" ref={searchRef}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <button className="clear-search" onClick={() => {
              setSearchValue('');
              if (onSearch) onSearch('');
            }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      )}

      {showMenu && (
        <ul className="dropdown-menu" ref={menuRef}>
          <li>
            <Link to="/all" onClick={() => setShowMenu(false)}>All Notes</Link>
          </li>
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
          </li>
          <li>Settings</li>
          <li>Toggle Theme</li>
        </ul>
      )}
    </>
  );
};

export default Header;