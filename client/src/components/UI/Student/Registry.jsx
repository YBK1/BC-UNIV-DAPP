import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Registry.module.css";

function Registry() {
  const { state: { artifact, contract, accounts } } = useEth();
  const [did, setDid] = useState("");
  const [json, setJson] = useState("");
  const [showProperty, setShow] = useState(false);

  const read = async () => {
    const id = await contract.methods.read(accounts[0]).call({ from: accounts[0] });
    setDid(id);
  };

  const write = async () => {
    await contract.methods.write(accounts[0], accounts[0]).send({ from: accounts[0] });
  };

  useEffect(() => {
    show();
  }, [json]);

  const show = async () => {
    await read();
    const didString = "did:ethr:" + did;
    const jsonObject = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/secp256k1recovery-2020/v2'
      ],
      id: didString,
      verificationMethod: [
        {
          id: didString,
          type: 'EcdsaSecp256k1RecoveryMethod2020',
          controller: didString,
          blockchainAccountId: 'eip155:' + artifact.networkID + ':' + didString
        }
      ],
      assertionMethod: [didString + '@context'],
      authentication: [didString + '@context']
    };

    if (did.trim() === ""){
      setShow(true);
      setJson("DID가 등록되지 않았습니다.");
    }
    else{
      setJson(jsonObject);
      setShow(true);
    }
  }

  return (
    <div className={styles.body}>
        DID는 현재 사용하고 있는 MetaMask의 Account 주소로 자동 결정됩니다.<br></br><br></br>
        <button onClick = {write}>
            DID 등록하기
        </button>
        <br></br><br></br>
        <button onClick = {show}>
            DID가 정상적으로 만들어 졌는지 확인하기
        </button>
        <pre>{showProperty && JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}

export default Registry;
