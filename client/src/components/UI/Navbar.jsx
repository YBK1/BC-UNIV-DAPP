import React from 'react';
import styles from './Navbar.module.css'

function Navbar(props) {
  const handleClick = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <nav className = {styles.TopNavbar}>
        <h1>DID WEB</h1>
        <div className = {styles.btnContainer}>
          <button className = {styles.btn} value="guide" onClick={handleClick}>
            Guide
          </button>
          <button className = {styles.btn} value="student" onClick={handleClick}>
            Student
          </button>
          <button className = {styles.btn} value="university" onClick={handleClick}>
            University
          </button>
          <button className = {styles.btn} value="verifier" onClick={handleClick}>
            Verifier
          </button>
          
        </div>
      </nav>
    </div>
  );
}
export default Navbar;