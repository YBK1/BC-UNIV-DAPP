import styles from "./Mains.module.css";
import React from 'react';
import Guide from "./Guide/Guide";
import Student from "./Student/Student";
import University from "./University/University";
import Verifier from "./Verifier/Verifier";

function Main(props) {
  return (
    <main className = {styles.mybox}>
      {props.page === 'home' && <h1>Home Window</h1>}
      {props.page === 'guide' && <Guide></Guide>}
      {props.page === 'student' && <Student></Student>}
      {props.page === 'university' && <University></University>}
      {props.page === 'verifier' && <Verifier></Verifier>}
    </main>
  );
}

export default Main;