import styles from "./Student.module.css";
import StudentTitle from "./StudentTitle";
import Registry from "./Registry";
import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";

import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

function Student({ setValue }) {
  const { state } = useEth();

  return (
    <div className="index">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            <div>
              <StudentTitle></StudentTitle>
              <Registry></Registry>
            </div>
      }
    </div>
  );
}

export default Student;
