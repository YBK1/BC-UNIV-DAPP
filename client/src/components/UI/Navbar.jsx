import React from 'react';
import styles from './Navbar.module.css'
import DropdownButton from './Student/shortComp/DropDown';

function Navbar(props) {
  const handleClick = (event) => {
    props.onChange(event.target.value);
  };
  const dropClick = (v) => {
    props.onChange(v);
  }
  const logoClick = () => {
    props.onChange('home');
  }

  return (
    <div className = {styles.main}>
      <nav className = {styles.TopNavbar}>
        <h1 className = {styles.logo} onClick = {logoClick}>DID WEB</h1>
        <div className = {styles.btnContainer}>
          <button className = {styles.btn} value="guide" onClick={handleClick}>
            Guide
          </button>
          <DropdownButton onClick = {dropClick}></DropdownButton>
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