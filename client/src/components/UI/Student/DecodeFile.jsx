import React, { useState } from 'react';
import styles from "./DecodeFile.module.css";
import SettingPDF from "./SettingPDF";

const DecodeFile = () => {
  const [encryptedData, setEncryptedData] = useState();
  const [encryptedKey, setEncryptedKey] = useState();
  const [encryptedIV, setEncryptedIV] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [decryptedJSON, setDecryptedJSON] = useState('암호화된 데이터들을 입력해주세요!');

  const forge = require('node-forge');

  const dataDecoding = async () => {
    try {
      const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
      const decrypted = privateKeyObj.decrypt(encryptedKey, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      const decryptedIV = privateKeyObj.decrypt(encryptedIV, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      const decipher = forge.cipher.createDecipher('AES-CBC', decrypted);
      decipher.start({iv: decryptedIV});
      decipher.update(forge.util.createBuffer(encryptedData));
      decipher.finish();

      const decryptedData = decodeURIComponent(decipher.output);
      console.log(decipher.output);
      console.log(decryptedData);
      const decryptedResult = JSON.parse(decryptedData);

      setDecryptedJSON(decryptedResult);

      alert('복호화가 완료되었습니다!');
    } catch (error) {
      alert('유효하지 않은 파일입니다.');
    }

    
  }

  const handleFileChange = (event, setFunc) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFunc(content);
    };

    reader.readAsText(file);
  };
  

  return (
    <div className = {styles.body}>
      <div className = {styles.title}>
        Decode data and get your certificate
      </div>
      <div className = {styles.main}>
        <p>
          IPFS에서 다운로드받은 암호화된 데이터들을 항목에 맞게 업로드해 주세요
        </p>
        <p>
          복호화가 진행되고 증명서의 내용을 확인할 수 있습니다
        </p>
      </div>
      <div className = {styles.bigContainer}>
        <div className = {styles.inputbox}>
          <div className = {styles.inputcontainer}>
            <label htmlFor="data" className = {styles.inputLabel}>Upload Encrypted Data: </label>
            <input name = "data" type="file" onChange={(e) => handleFileChange(e, setEncryptedData)} />
          </div>
          <div className = {styles.inputcontainer}>
            <label htmlFor="key" className = {styles.inputLabel}>Upload Encrypted Key: </label>
            <input name="key" type="file" onChange={(e) => handleFileChange(e, setEncryptedKey)} />
          </div>
          <div className = {styles.inputcontainer}>
            <label htmlFor="iv" className = {styles.inputLabel}>Upload Encrypted IV: </label>
            <input name="iv" type="file" onChange={(e) => handleFileChange(e, setEncryptedIV)} />
          </div>
        </div>
        <div className = {styles.inputcontainer}>
          <label htmlFor="priv" className = {styles.inputLabel}>Upload Your Private Key: </label>
          <input name="priv" type="file" onChange={(e) => handleFileChange(e, setPrivateKey)} />
        </div>
      </div>
      <div className = {styles.btnContainer}>
        <button className = {styles.btn} onClick = {() => dataDecoding()}>복호화</button>
      </div>
      <SettingPDF vc = {decryptedJSON}></SettingPDF>
    </div>
  );
}

export default DecodeFile;
