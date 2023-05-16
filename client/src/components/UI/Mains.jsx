import styles from "./Mains.module.css";
import Guide from "./Guide/Guide";
import Student from "./Student/Student";
import React from 'react';

function Main(props) {
  return (
    <main className = {styles.mybox}>
      {props.page === 'guide' && <Guide></Guide>}
      {props.page === 'student' && <Student></Student>}
      {props.page === 'contact' && <h1>Contact us.</h1>}
    </main>
  );
}

export default Main;