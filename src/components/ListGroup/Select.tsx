import React from "react";

const Select = ({ options, defaultOption, onChange }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <select
      className="form-select bg-dark text-white mb-4 auto-width border-0"
      aria-label="Default select example"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled>{defaultOption}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
