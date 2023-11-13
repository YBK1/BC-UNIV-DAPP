import styles from "./Mains.module.css";
import React from 'react';
import Home from "./Home/Home";
import Guide from "./Guide/Guide";
import Student from "./Student/Student";
import University from "./University/University";
import Verifier from "./Verifier/Verifier";

function Main(props) {
  return (
    <main className = {styles.mybox}>
      {props.page === 'home' && <Home></Home>}
      {props.page === 'guide' && <Guide v = {'default'}></Guide>}
      {props.page === 'studentGuide' && <Guide v = {'studentGuide'}></Guide>}
      {props.page === 'univGuide' && <Guide v = {'univGuide'}></Guide>}
      {props.page === 'verifyGuide' && <Guide v = {'verifyGuide'}></Guide>}
      {props.page === 'registry' && <Student v = {'Registry'}></Student>}
      {props.page === 'receivevc' && <Student v = {'Receiving'}></Student>}
      {props.page === 'decodefile' && <Student v = {'DecodeFile'}></Student>}
      {props.page === 'university' && <University></University>}
      {props.page === 'verifier' && <Verifier></Verifier>}
    </main>
  );
}

export default Main;