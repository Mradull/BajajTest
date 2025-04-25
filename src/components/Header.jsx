import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Header.css";

const Header = ({ data }) => {
  const [params] = useSearchParams();
  const [input, setInput] = useState(params.get("search") || "");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
    } else {
      const lowerInput = input.toLowerCase();
      const filtered = data
        .filter((doc) => doc.name.toLowerCase().includes(lowerInput))
        .slice(0, 3); // Only top 3
      setSuggestions(filtered);
    }
  }, [input, data]);

  const handleSearch = (term) => {
    const newParams = new URLSearchParams(params);
    if (term.trim()) {
      newParams.set("search", term.trim());
    } else {
      newParams.delete("search");
    }
    navigate({ search: newParams.toString() });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <div className="header-wrapper">
      <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
        <input
          type="text"
          name="search"
          placeholder="Search Symptoms, Doctors..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doc) => (
            <li key={doc.id} onClick={() => handleSearch(doc.name)} className="suggestion-item">
              <img src={doc.photo} alt={"img"} className="suggestion-image" />
              <span className="suggestion-name">{doc.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
