import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Registry.module.css";

function Registry() {
  const { state: { artifacts, contracts, accounts } } = useEth();
  const [did, setDid] = useState(null);
  const [thisPubKey, setPubKey] = useState(null);
  const [condition, setCondition] = useState('init');

  const forge = require('node-forge');

  const generateKeyPair = async () => {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    return {
      publicKey: forge.pki.publicKeyToPem(keys.publicKey),
      privateKey: forge.pki.privateKeyToPem(keys.privateKey),
    };
  }

  const readID = async () => {
    const id = await contracts[0].methods.readID(accounts[0]).call({ from: accounts[0] });
    setDid(id);
  };

  const readPubKey = async () => {
    const pk = await contracts[0].methods.readPubkey(accounts[0]).call({ from: accounts[0] });
    setPubKey(pk);
  };

  const write = async () => {
    const keyPair = generateKeyPair();

    const blob = new Blob([(await keyPair).privateKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'private_key.txt';
    link.click();

    await contracts[0].methods.write(accounts[0], accounts[0], (await keyPair).publicKey).send({ from: accounts[0] });
  };

  const read = async () => {
    await readID();
    await readPubKey();
  }

  const check = async () => {
    await read();

    setCondition('set');
  }

  condition ? (
    <div>
      Ethereum Address: {did}<p></p>
      Public Key: <p></p> {thisPubKey}
    </div>
  ) : (
    <div>정보가 아직 블록체인에 등록되지 않았습니다.<p></p>
    우측 하단의 버튼을 클릭해 정보를 등록해 보세요</div>
  )

  return (
    <div>
      <div className = {styles.top}>
        <p>Ethereum 블록체인에 기본 정보를 등록할 수 있습니다.</p>
        <p>등록 버튼 클릭시 Ether 소모와 함께 등록이 진행되며 등록 완료시 주소와 암호화 키를 확인할 수 있습니다.</p>
      </div>
      <div className={styles.body}>
        <div className = {styles.left}>
          <button onClick = {() => check()} className = {styles.rbtn}>
              등록 여부 확인하기
          </button>
          {condition === 'init' ? (
            <div className = {styles.message}>상단의 버튼을 눌러 등록 여부를 확인할 수 있습니다.</div>
          ) : condition === 'set' ? (
            <div className = {styles.message}>
              <div>Ethereum Address: {did}</div>
              <br></br>
              <div>Public Key: <p></p> {thisPubKey}</div>
            </div>
          ) : (
            <div className = {styles.message}>
              정보가 아직 블록체인에 등록되지 않았습니다.<p></p>
              우측 하단의 버튼을 클릭해 정보를 등록해 보세요
            </div>
          )}
        </div>
        <div className = {styles.right}>
          <button onClick = {write} className={styles.btn}>
              <div>
                {/* <img src={"imgs/upload.png"}></img> */}
                <span>등록하기</span>
              </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registry;
