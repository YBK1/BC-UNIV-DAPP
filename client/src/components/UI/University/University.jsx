import styles from "./University.module.css";
import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";

import useEth from "../../../contexts/EthContext/useEth";
import UniversityTitle from "./UniversityTitle";
import CreateVC from "./CreateVC";

function University() {
  const { state } = useEth();

  return (
    <div className={styles.index}>
      {
        !state.artifacts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            <div>
              {/* <UniversityTitle></UniversityTitle> */}
              <CreateVC></CreateVC>
            </div>
      }
    </div>
  );
}

export default University;
