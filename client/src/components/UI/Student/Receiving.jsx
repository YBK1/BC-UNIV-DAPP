import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Receiving.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Receiving() {
  const { state: {contracts, accounts} } = useEth();
  const [cid, setCid] = useState();
  const [condition, setCondition] = useState(false);

  const retrieveCID = async () =>{
    const retrievedCid = await contracts[2].methods.read(accounts[0]).call({ from: accounts[0] });
    if(retrievedCid !== ''){
      setCondition(true);
    }
    setCid("ipfs.io/ipfs/" + retrievedCid);
  }

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(cid);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
};

  return (
    <div>
      <div className = {styles.title}>
        Get Your CID
      </div>
      <div className = {styles.main}>
        <p>
          학교에서 증명서 발급을 완료하면, 여기에서 당신을 위한 CID를 확인할 수 있습니다
        </p>
        <p>
          하단의 버튼을 클릭해 발급이 완료되었는지 확인해 보세요
        </p>
      </div>
      <div className = {styles.btnContainer}>
        <button className = {styles.btn} onClick = {retrieveCID}>CID 확인하기</button>
      </div>
      <div className = {styles.result}>
        {cid &&
            (condition ? 
              (<div>
                <div className = {styles.docs}>
                  <div className = {styles.result}>
                      <FontAwesomeIcon className = {styles.icon} onClick = {handleCopyClipBoard} icon={faCopy} fade />
                      <div>{cid}</div>
                  </div>
                  <div>
                    <p>좌측 아이콘을 클릭해 주소를 복사해서 주소창에 입력해보세요</p>
                    <p>IPFS Gateway에서 암호화된 당신의 증명서를 얻을 수 있습니다</p>
                  </div>
                </div>
              </div>) 
              : (<div>
                <div className = {styles.result}>
                  <FontAwesomeIcon className = {styles.icon} icon={faXmark} beatFade />
                  <p>아직 발급 되지 않았습니다..</p>
                </div>
              </div>))
        }
      </div>
    </div>
  );
}

export default Receiving;
