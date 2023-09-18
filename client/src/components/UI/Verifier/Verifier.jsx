import NoticeNoArtifact from "../../Demo/NoticeNoArtifact";
import NoticeWrongNetwork from "../../Demo/NoticeWrongNetwork";

import useEth from "../../../contexts/EthContext/useEth";
import VerifierTitle from "./VerifierTitle";
import DecodeVC from "./DecodeVC";
import VerifyHash from "./VerifyHash";

function Verifier() {
  const { state } = useEth();

  return (
    <div className="index">
      {
        !state.artifacts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            <div>
              {/* <VerifierTitle></VerifierTitle> */}
              <VerifyHash></VerifyHash>
            </div>
      }
    </div>
  );
}

export default Verifier;
