import React from 'react';
import styles from './Footer.module.css';

function Footer(props) {
  const handleClick = () => {
    props.onChange(true);
  };

  return (
    <div className = {styles.main}>
      <nav className = {styles.nav}>
        <div></div>
        <button className = {styles.btn} onClick = {handleClick}>
          Manager
        </button>
      </nav>
    </div>
  );
}
export default Footer;