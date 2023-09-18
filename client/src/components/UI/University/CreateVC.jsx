import React, { useState } from 'react';
import styles from './CreateVC.module.css'
import useEth from "../../../contexts/EthContext/useEth";
import { Web3Storage } from 'web3.storage';

const CreateVC = () => {
  const { state: { contracts, accounts, web3 } } = useEth();
  const [formData, setFormData] = useState({// VC의 JSON형태
      Name: '',
      Gender: '',
      Birthday: '',
      University: '',
      StudentId: '',
      Major: '',
      AdmissionDate: '',
      GraduationDate: '',
      OverallGrade: '',
      MajorGrade: ''
    });

  const [userAddress, setUserAddress] = useState(''); // 발급 요청한 유저의 주소
  const [accessToken, setAccessToken] = useState(''); // IPFS Token입력값

  const forge = require('node-forge');

  // 이더리움에 JSON 각각 정보 Hash값을 저장
  const setHash = async () => {
    await contracts[1].methods.setHash(
      userAddress,
      web3.utils.soliditySha3({t: 'string', v: formData.Name.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.Gender.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.Birthday.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.University.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.StudentId.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.Major.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.AdmissionDate.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.GraduationDate.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.OverallGrade.toString()}),
      web3.utils.soliditySha3({t: 'string', v: formData.MajorGrade.toString()})
    ).send({from: accounts[0]});
  }

  // JSON데이터를 publicKey에 의해서 암호화하기
  const encryptData = async (publicKey) => {
    const jsonToString = JSON.stringify(formData);
    const korEncode = encodeURIComponent(jsonToString);

    const symmetricKey = forge.random.getBytesSync(32);
    const iv = forge.random.getBytesSync(16);

    const cipher = forge.cipher.createCipher('AES-CBC', symmetricKey);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(korEncode));
    cipher.finish();
    //const encrypted = cipher.output.bytes;
    const encrypted = cipher.output.getBytes();

    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    const encryptedKey = publicKeyObj.encrypt(symmetricKey, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    const encryptedIV = publicKeyObj.encrypt(iv, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });

    return {data: encrypted, key: encryptedKey, iv: encryptedIV};
  }
  

  const uploadIPFS = async (objs) => {
    console.log(objs);

    const getAccessToken = () => {
      return accessToken;
    }
    
    const makeStorageClient = () => {
      return new Web3Storage({ token: getAccessToken() })
    }

    const storeFiles = async (objs) => {
      const files = [
        new File([objs.data], 'Encrypted_data.txt', { type: 'text/plain' }),
        new File([objs.key], 'Encrypted_key.txt', { type: 'text/plain' }),
        new File([objs.iv], 'Encrypted_iv.txt', {type: 'text/plain'})
      ]

      const client = makeStorageClient()
      const cid = await client.put(files)

      await contracts[2].methods.add(userAddress, cid).send({from: accounts[0]});

      return cid
    }

    storeFiles(objs);
  }

  // IPFS에 암호화된 VC를 올린다
  const handleUpload = async () => {
    const pubk = await contracts[0].methods.readPubkey(userAddress).call({ from: accounts[0] });

    const data = await encryptData(pubk);
    uploadIPFS(data);
  };

  // input에 들어가는 onChange 함수들
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };
  const handleTokenChange = (event) => {
    setAccessToken(event.target.value);
  };
  // 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    await setHash();
    await handleUpload();
  };

  return (
    <div>
      <div className = {styles.top}>
        <p>증명서 발급을 요청한 학생의 Ethereum 주소를 먼저 입력하고 항목에 맞추어 학생의 정보를 입력합니다.</p>
        <p>Web3Storage의 API token 값을 입력하고 발급 버튼을 누르면 발급이 완료됩니다.</p>
      </div>
      <div className = {styles.inputdiv}>
        <input type="text" name="Address" className = {styles.input} value={userAddress} onChange={handleAddressChange} required />
        <label htmlFor="Address" className = {styles.inputLabel}>Ethereum Address of Student</label>
        <span className = {styles.span}></span>
      </div>
      <div className = {styles.inputdiv}>
        <input type="text" name="token" className = {styles.input} value={accessToken} onChange={handleTokenChange} required />
        <label htmlFor="token" className = {styles.inputLabel}>Web3Storage API token</label>
        <span className = {styles.span}></span>
      </div>
      <form onSubmit={handleSubmit} className = {styles.form}>
        <div className = {styles.inputdiv}>
          <input type="text" name="Name" className = {styles.input} value={formData.Name} onChange={handleChange} required />
          <label htmlFor="name" className = {styles.inputLabel}>Name</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="Gender" className = {styles.input} value={formData.Gender} onChange={handleChange} required />
          <label htmlFor="Gender" className = {styles.inputLabel}>Gender</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="Birthday" className = {styles.input} value={formData.Birthday} onChange={handleChange} required />
          <label htmlFor="Birthday" className = {styles.inputLabel}>Birthday</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="University" className = {styles.input} value={formData.University} onChange={handleChange} required />
          <label htmlFor="University" className = {styles.inputLabel}>University</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="StudentId" className = {styles.input} value={formData.StudentId} onChange={handleChange} required />
          <label htmlFor="StudentId" className = {styles.inputLabel}>StudentId</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="Major" className = {styles.input} value={formData.Major} onChange={handleChange} required />
          <label htmlFor="Major" className = {styles.inputLabel}>Major</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="AdmissionDate" className = {styles.input} value={formData.AdmissionDate} onChange={handleChange} required />
          <label htmlFor="AdmissionDate" className = {styles.inputLabel}>AdmissionDate</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="GraduationDate" className = {styles.input} value={formData.GraduationDate} onChange={handleChange} required />
          <label htmlFor="GraduationDate" className = {styles.inputLabel}>GraduationDate</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="OverallGrade" className = {styles.input} value={formData.OverallGrade} onChange={handleChange} required />
          <label htmlFor="OverallGrade" className = {styles.inputLabel}>OverallGrade</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.inputdiv}>
          <input type="text" name="MajorGrade" className = {styles.input} value={formData.MajorGrade} onChange={handleChange} required />
          <label htmlFor="MajorGrade" className = {styles.inputLabel}>MajorGrade</label>
          <span className = {styles.span}></span>
        </div>
        <button type="submit" className = {styles.btn}>발급하기</button>
      </form>
      
      {/* <div>
        <label htmlFor="majorGrade" className = {styles.inputLabel}>IPFS Upload</label>
        <input type="text" value={accessToken} onChange={handleTokenChange} required />
        <button onClick={handleUpload}>Upload To IPFS</button>
      </div> */}
      
    </div>
  );
};

export default CreateVC;
