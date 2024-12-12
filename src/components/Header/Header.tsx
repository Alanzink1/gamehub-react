import React, { useState, useEffect } from "react";
import "../../styles/HeaderComponents.css";

const Header = ({ onSearch, toggleTheme }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(inputValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, onSearch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark background-navbar d-flex justify-content-between">
        <a className="navbar-brand" href="#">
          <img
            className="logo"
            src="https://cdn-icons-png.flaticon.com/512/8002/8002111.png"
            alt="Logo"
          />
        </a>
        <input
          className="form-control input-class placeholder-white border-0 text-white"
          type="search"
          placeholder="Search games..."
          aria-label="Search"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="form-check form-switch toggle-option">
          <input
            className="form-check-input bg-success toggle-css"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={toggleTheme}
          />
          <label
            className="form-check-label text-white"
            htmlFor="flexSwitchCheckDefault"
          >
            Dark Mode
          </label>
        </div>
      </nav>
    </header>
  );
};

export default Header;
