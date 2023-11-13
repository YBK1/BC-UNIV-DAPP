import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Registry.module.css";

function Registry() {
  const { state: { contracts, accounts } } = useEth();
  // const [did, setDid] = useState(null);
  // const [thisPubKey, setPubKey] = useState(null);
  // const [condition, setCondition] = useState('init');

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
    //setDid(id);
    return id;
  };

  // const readPubKey = async () => {
  //   const pk = await contracts[0].methods.readPubkey(accounts[0]).call({ from: accounts[0] });
  //   //setPubKey(pk);
  //   return pk;
  // };

  const write = async () => {
    if(await readID() === accounts[0]){
      alert('이미 사용자 등록이 되어있는 주소입니다.');
    }
    else{
      const keyPair = generateKeyPair();

      const blob = new Blob([(await keyPair).privateKey], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'private_key.txt';
      link.click();

      await contracts[0].methods.write(accounts[0], accounts[0], (await keyPair).publicKey).send({ from: accounts[0] });
      alert('사용자 등록이 완료되었습니다.');
    }
  };

  return (
    <div>
      <div className = {styles.title}>
          SIGN UP HERE
      </div>
      <div className = {styles.main}>
          <p>시스템 이용을 위해서 사용자 등록이 필요합니다.</p>
          <p>하단의 버튼을 클릭하여 사용자 등록을 진행하고 앞으로 사용할 암호화 키를 발급받으세요!</p>
      </div>
      <div className = {styles.btnContainer}>
        <button onClick = {write} className={styles.btn}>
          <div>
            <span>Sign Up</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Registry;
