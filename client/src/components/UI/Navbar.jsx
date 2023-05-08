import React from 'react';
import { Helmet } from "react-helmet";
import styles from './Navbar.module.css'

function Navbar(props) {
  const handleClick = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <nav className = {styles.TopNavbar}>
        <h1>React</h1>
        <div className = {styles.btnContainer}>
          <button className = {styles.btn} value="guide" onClick={handleClick}>
            Home
          </button>
          <button className = {styles.btn} value="about" onClick={handleClick}>
            About
          </button>
          <button className = {styles.btn} value="contact" onClick={handleClick}>
            Contact
          </button>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;