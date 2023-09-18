import React, { useState } from 'react';
import styles from "./DecodeFile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const DecodeFile = (props) => {
  const [encryptedData, setEncryptedData] = useState();
  const [encryptedKey, setEncryptedKey] = useState();
  const [encryptedIV, setEncryptedIV] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [decryptedJSON, setDecryptedJSON] = useState();

  const forge = require('node-forge');

  const dataDecoding = async () => {
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
    props.setVC(decryptedResult);
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
      <div className = {styles.bigContainer}>
        <div className = {styles.top}>
          <span>IPFS를 통해 다운로드 받은 데이터들을 복호화해 증명서를 얻을 수 있습니다.</span>
          <p>Encrypted Data / Encrypted Key / Encrypted IV 순으로 업로드 해야 합니다.</p>
          <p>처음 시스템 등록시 발급 받았던 암호화 키를 또한 업로드합니다.</p>
        </div>
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
      <div className = {styles.message}>
        {decryptedJSON && (
          <div>복호화가 완료되었습니다. SettingPDF로 이동하여 PDF 파일로 증명서를 발급받으세요</div>
        )}
      </div>
    </div>
  );
}

export default DecodeFile;
