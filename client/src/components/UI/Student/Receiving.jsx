import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Receiving.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons'

function Receiving() {
  const { state: {contracts, accounts} } = useEth();
  const [cid, setCid] = useState();

  const retrieveCID = async () =>{
    const retrievedCid = await contracts[2].methods.read(accounts[0]).call({ from: accounts[0] });
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
      <div className = {styles.top}>
        <span>학교에서 증명서를 발급 완료하였다면 블록체인에 발급된 증명서의 CID가 기록될 것 입니다.</span>
        <p>하단의 버튼을 누르면 IPFS Gateway 주소가 표시되며 왼쪽 아이콘을 눌러 복사할 수 있습니다. </p>
        <p>표시되는 주소를 주소록에 입력하면 암호화된 데이터를 다운로드 받을 수 있는 IPFS로 이동합니다.</p>
      </div>
      <div className = {styles.flexbox}>
        <button className = {styles.btn} onClick = {retrieveCID}>CID 확인하기</button>
      </div>
      <div className = {styles.result}>
        {cid && <div className = {styles.copyboard}>
            <FontAwesomeIcon className = {styles.icon} onClick = {handleCopyClipBoard} icon={faCopy} fade />
            <div>{cid}</div>
          </div>}
      </div>
    </div>
  );
}

export default Receiving;
