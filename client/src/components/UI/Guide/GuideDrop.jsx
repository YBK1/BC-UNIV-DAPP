import React from 'react';
import styles from "./DropDown.module.css";

function GuideDrop(props) {
  return (
    <div className = {styles.dropdown}>
        <button className = {styles.dropbtn} onClick = {() => props.onClick('guide')}> 
          Guide
        </button>
        
        <div className={styles.dropdown_content}>
            <li onClick = {() => props.onClick('studentGuide')}>Student</li>
            <li onClick = {() => props.onClick('univGuide')}>University</li>
            <li onClick = {() => props.onClick('verifyGuide')}>Verifier</li>
        </div>
    </div>
  );
}

export default GuideDrop;