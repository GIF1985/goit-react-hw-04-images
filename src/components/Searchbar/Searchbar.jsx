import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery.trim());
    setSearchQuery('');
    searchInputRef.current.focus();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          ref={searchInputRef}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
