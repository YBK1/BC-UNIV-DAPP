import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";
import styles from "./Verifier.module.css";
import useEth from "../../../contexts/EthContext/useEth";
import VerifyHash from "./VerifyHash";

function Verifier() {
  const { state } = useEth();

  return (
    <div className = {styles.index}>
      {
        !state.artifacts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            <div>
              <VerifyHash></VerifyHash>
            </div>
      }
    </div>
  );
}

export default Verifier;
