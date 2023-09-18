import styles from "./Student.module.css";
import StudentTitle from "./StudentTitle";
import Registry from "./Registry";
import DecodeFile from "./DecodeFile";
import Receiving from "./Receiving";
import SettingPDF from "./SettingPDF";
import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";

import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function Student() {
  const { state } = useEth();
  const [studentComponent, setStudentComponent] = useState(null);
  const [vc, setVC] = useState();
  const rendering = () => {
    if (studentComponent === 'Registry') {
      return <Registry />;
    } else if (studentComponent === 'DecodeFile') {
      return <DecodeFile setVC = {setVC}/>;
    } else if (studentComponent === 'Receiving') {
      return <Receiving />;
    } else if (studentComponent === 'SettingPDF'){
      return <SettingPDF vc = {vc}/>;
    }
    return null;
  };

  const changeComponent = (componentName) => {
    setStudentComponent(componentName);
  };

  return (
    <div className={styles.index}>
      {
        !state.artifacts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            <div>
              <StudentTitle onButtonClick = {changeComponent}>
              </StudentTitle>
              {rendering(studentComponent)}
            </div>
      }
    </div>
  );
}

export default Student;
