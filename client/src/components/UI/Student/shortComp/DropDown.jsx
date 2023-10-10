import React from 'react';
import styles from "./DropDown.module.css";

function Dropdown(props) {
  return (
    <div className = {styles.dropdown}>
        <button className = {styles.dropbtn}> 
          Student
        </button>
        
        <div className={styles.dropdown_content}>
            <li onClick = {() => props.onClick('registry')}>SignUp</li>
            <li onClick = {() => props.onClick('receivevc')}>Receive</li>
            <li onClick = {() => props.onClick('decodefile')}>Decode</li>
        </div>
    </div>
  );
}

export default Dropdown;
