import React from 'react';
import { useState } from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Header = () =>{
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setShowMenu(false); // إغلاق القائمة لو مفتوحة
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
    setShowSearch(false); // إخفاء البحث لو ظاهر
  };

    return(
        <>
        <header className="header">
                <h1 className="header-title">NOTES</h1>
            <div className="header-details">
                <button title="search" onClick={handleSearchToggle}><FontAwesomeIcon icon={faSearch} /> </button>
                <button title="more options" onClick={handleMenuToggle}><FontAwesomeIcon icon={faEllipsisV} /> </button>
            </div>
        </header>
                          {showSearch && (
        <input
          type="text"
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
      )}

      {showMenu && (
        <ul className="dropdown-menu">
         <Link to ="/all" className = "li"><li>All Notes</li></Link> 
          <li>Settings</li>
          <li>Toggle Theme</li>
          <li>Logout</li>
          
        </ul>
      )}
        </>
    )
}
export default Header;