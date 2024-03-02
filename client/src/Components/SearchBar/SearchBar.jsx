import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findByName } from "../../Redux/actions";
import style from "../SearchBar/SearchBar.module.css";

const SearchBar = () => {
  const allDrivers = useSelector((state) => state.drivers);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    const matches =
      value.length > 0
        ? allDrivers
            .filter((driver) =>
              driver.name.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 3)
        : [];
    setSuggestion(matches);
    setName(value);
  };

  const suggestionHandler =(name) => {
    setName(name);
    setSuggestion([]);
    dispatch(findByName(name));
  }

  const handleSubmit = ()  => {
    dispatch(findByName(name));
  }

  return (
    <div className={style.bar}>
      <input
        className={style.searchImput}
        type="text"
        placeholder="Search.."
        value={name}
        onChange={handleInputChange}
        onBlur={() => { setTimeout(() => setSuggestion([]), 200)}}
      />
      {suggestion.length > 0 && (
        <div>
          <ul>
            {suggestion.map((suggestion, index) => (
            <li
            key={index}
            className="suggestion-li"
            onClick={() => suggestionHandler(suggestion.name)}
            >
              {suggestion.name}
            </li>
            ))}
          </ul>
        </div>

      )}
      <button className={style.searchButton}  type="submit" onClick={handleSubmit}>
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default SearchBar;