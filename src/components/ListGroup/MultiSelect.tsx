import React, { useState } from "react";
import "../../styles/MultiSelect.css"; 

const MultiSelect = ({ options, defaultOption, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <div className="multi-select">
      <button className="multi-select-btn">{defaultOption}</button>
      <div className="multi-select-dropdown">
        {options.map((option, index) => (
          <label key={index} className="multi-select-option">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
