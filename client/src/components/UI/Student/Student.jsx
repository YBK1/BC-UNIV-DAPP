import styles from "./Student.module.css";
import Registry from "./Registry";
import DecodeFile from "./DecodeFile";
import Receiving from "./Receiving";
import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";

import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function Student(props) {
  const { state } = useEth();
  const [studentComponent] = useState(props.v);
  const rendering = () => {
    if (studentComponent === 'Registry') {
      return <Registry />;
    } else if (studentComponent === 'DecodeFile') {
      return <DecodeFile/>;
    } else if (studentComponent === 'Receiving') {
      return <Receiving />;
    }
    return null;
  };

  // const changeComponent = (componentName) => {
  //   setStudentComponent(componentName);
  // };

  return (
    <div className={styles.index}>
      {
        !state.artifacts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            <div>
              {rendering(studentComponent)}
            </div>
      }
    </div>
  );
}

export default Student;
