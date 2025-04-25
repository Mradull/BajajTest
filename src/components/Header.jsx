// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Header.css"; // Optional for styling

const Header = ({ data }) => {
  const [input, setInput] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(params);
    if (input.trim()) {
      newParams.set("search", input.trim());
    } else {
      newParams.delete("search");
    }
    navigate({ search: newParams.toString() });
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search Symptoms, Doctors..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">🔍</button>
    </form>
  );
};

export default Header;
