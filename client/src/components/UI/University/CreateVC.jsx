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
    const getAccessToken = () => {
      return accessToken;
    }
    
    const makeStorageClient = () => {
      const client =  new Web3Storage({ token: getAccessToken() });
      return client;
    }

    const storeFiles = async (objs) => {
      const files = [
        new File([objs.data], 'Encrypted_data.txt', { type: 'text/plain' }),
        new File([objs.key], 'Encrypted_key.txt', { type: 'text/plain' }),
        new File([objs.iv], 'Encrypted_iv.txt', {type: 'text/plain'})
      ]

      let client;
      let cid;

      try{
        client = makeStorageClient();
        cid = await client.put(files);
      }
      catch(error){
        alert('유효한 Web3.storage API 토큰이 아닙니다');
      }
      finally{
        // transaction batch 처리하기
        const cidAdd = contracts[2].methods.add(userAddress, cid).send({from: accounts[0]});
        const hashAdd = contracts[1].methods.setHash(
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

        const batch = new web3.BatchRequest();
        batch.add(cidAdd);
        batch.add(hashAdd);

        await batch.execute();
      }
    }

    alert('증명서 발급이 진행중입니다. MetaMask Transaction을 기다려 주세요');
    await storeFiles(objs);
  }

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

    if(!(userAddress && accessToken)){
      alert('IPFS 전달을 위한 정보를 입력해주세요');
      return;
    }

    const isValidHex = (value) => /^0x[0-9A-Fa-f]+$/.test(value);
    if(!isValidHex(userAddress)){
      alert('유효한 이더리움 주소가 아닙니다.');
      return;
    }

    const isValidDate = (date) => /^\d{4}\.\d{2}\.\d{2}$/.test(date);
    if(!isValidDate(formData.Birthday)){
      alert('생일의 형식이 적절하지 않습니다.');
      return;
    }

    const isValidMonth = (month) => /^\d{4}\/\d{2}$/.test(month);
    if(!isValidMonth(formData.AdmissionDate)){
      alert('입학일자의 형식이 적절하지 않습니다.');
      return;
    }
    if(!isValidMonth(formData.GraduationDate)){
      alert('졸업일자의 형식이 적절하지 않습니다.');
      return;
    }

    const isValidScore = (score) => /^\d+(\.\d{1,2})?\/\d+(\.\d{1,2})?$/.test(score);
    if(!isValidScore(formData.MajorGrade)){
      alert('전공평점의 형식이 적절하지 않습니다.');
      return;
    }
    if(!isValidScore(formData.OverallGrade)){
      alert('전체평점의 형식이 적절하지 않습니다.');
      return;
    }

    await handleUpload();
  };

  return (
    <div className = {styles.container}>
      <div className = {styles.title}>
        <p>Issuing certificate</p>
      </div>
      <div className = {styles.main}>
        <p>학생이 증명서 발급을 요청했다면, 바로 여기에서 발급을 시도해보세요!</p>
        <p>IPFS를 통해서 학생에게 증명서를 전달하고, 블록체인에 검증용 데이터를 남깁니다.</p>
      </div>
      <div className = {styles.optionBox}>
        <div className = {styles.main}>
          <p>IPFS 전달을 위한 정보를 입력하세요</p>
        </div>
        <div className = {styles.optiondiv}>
          <input type="text" name="Address" className = {styles.option} value={userAddress} onChange={handleAddressChange} required />
          <label htmlFor="Address" className = {styles.optionLabel}>Ethereum Address of Student</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.optiondiv}>
          <input type="text" name="token" className = {styles.option} value={accessToken} onChange={handleTokenChange} required />
          <label htmlFor="token" className = {styles.optionLabel}>Web3Storage API token</label>
          <span className = {styles.span}></span>
        </div>
      </div>
      <div className = {styles.optionBox}>
        <div className = {styles.main}>
          항목에 맞게 학생에게 발급할 증명서의 내용을 입력하세요
        </div>
        <form onSubmit={handleSubmit} className = {styles.form}>
          <div className = {styles.optiondiv}>
            <input type="text" name="Name" className = {styles.option} value={formData.Name} onChange={handleChange} required />
            <label htmlFor="name" className = {styles.optionLabel}>Name</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="Gender" className = {styles.option} value={formData.Gender} onChange={handleChange} required />
            <label htmlFor="Gender" className = {styles.optionLabel}>Gender</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="Birthday" className = {styles.option} value={formData.Birthday} onChange={handleChange} required />
            <label htmlFor="Birthday" className = {styles.optionLabel}>Birthday (YYYY.MM.DD)</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="University" className = {styles.option} value={formData.University} onChange={handleChange} required />
            <label htmlFor="University" className = {styles.optionLabel}>University</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="StudentId" className = {styles.option} value={formData.StudentId} onChange={handleChange} required />
            <label htmlFor="StudentId" className = {styles.optionLabel}>StudentId</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="Major" className = {styles.option} value={formData.Major} onChange={handleChange} required />
            <label htmlFor="Major" className = {styles.optionLabel}>Major</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="AdmissionDate" className = {styles.option} value={formData.AdmissionDate} onChange={handleChange} required />
            <label htmlFor="AdmissionDate" className = {styles.optionLabel}>AdmissionDate (YYYY/MM)</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="GraduationDate" className = {styles.option} value={formData.GraduationDate} onChange={handleChange} required />
            <label htmlFor="GraduationDate" className = {styles.optionLabel}>GraduationDate (YYYY/MM)</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="OverallGrade" className = {styles.option} value={formData.OverallGrade} onChange={handleChange} required />
            <label htmlFor="OverallGrade" className = {styles.optionLabel}>OverallGrade (평점/만점)</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="MajorGrade" className = {styles.option} value={formData.MajorGrade} onChange={handleChange} required />
            <label htmlFor="MajorGrade" className = {styles.optionLabel}>MajorGrade (평점/만점)</label>
            <span className = {styles.span}></span>
          </div>
          <div className = {styles.btnContainer}>
            <button type="submit" className = {styles.btn}>발급하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVC;
