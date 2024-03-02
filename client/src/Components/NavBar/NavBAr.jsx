import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from '../NavBar/NavBar.module.css';


const NavBar = ({ onSearch }) => {
  return (
    <div className={styles.navBar}>
      <SearchBar onSearch={onSearch} />
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>
      <Link to={"/form"}>
        <button>CREATE</button>
      </Link>
      <Link to={'/'}>
        <button>LOGOUT</button>
      </Link>
    </div>
  );
};

export default NavBar