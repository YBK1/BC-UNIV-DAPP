import React, { useState } from 'react';
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./Verify.module.css";
import Checkbox from "./shortComp/CheckBox";

const VerifyHash = () => {
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
  const [nameCheck, setNameCheck] = useState(true);
  const [genderCheck, setGenderCheck] = useState(true);
  const [birthdayCheck, setBirthdayCheck] = useState(true);
  const [universityCheck, setUniversityCheck] = useState(true);
  const [studentIdCheck, setStudentIdCheck] = useState(true);
  const [majorCheck, setMajorCheck] = useState(true);
  const [admissionCheck, setAdmissionCheck] = useState(true);
  const [graduationCheck, setGraduationCheck] = useState(true);
  const [overallGradeCheck, setOverallGradeCheck] = useState(true);
  const [majorGradeCheck, setMajorGradeCheck] = useState(true);

  const [userAddress, setUserAddress] = useState(''); // 발급 요청한 유저의 주소
  const [hashBool, setHashBool] = useState('');

  const checkStates = [nameCheck, genderCheck, birthdayCheck, universityCheck, studentIdCheck, majorCheck, admissionCheck, graduationCheck, overallGradeCheck, majorGradeCheck];

  //hash값 비교
  const checkHash = async () => {
    const hashvalue = await contracts[1].methods.getHash(userAddress).call({ from: accounts[0] });
    let index = 0; let result = '';
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
          if(checkStates[index] === false){
            result += key + ': 검증하지 않음\n';
          }
          else{
            if(hashvalue[index] === web3.utils.soliditySha3({t: 'string', v: value})){
              result += key + ': 일치\n';
            }
            else{
              result += key + ': 불일치\n';
            }
          }
          index += 1;
      }
    }
    setHashBool(result);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkHash();
  };

  return (
    <div>
      <div className = {styles.top}>
        <span>학생에게 전달 받은 증명서의 유효성을 검증합니다.</span>
        <p>검증하고자 하는 항목을 체크하고 내용을 입력한다음 검증을 시작하면 결과를 확인할 수 있습니다.</p>
      </div>
      <div className = {styles.body}>
        <div className = {styles.inputdiv}>
          <input type="text" name="Address" className = {styles.input} value={userAddress} onChange={handleAddressChange} required />
          <label htmlFor="Address" className = {styles.inputLabel}>Ethereum Address of Student</label>
          <span className = {styles.span}></span>
        </div>
        <form onSubmit={handleSubmit} className = {styles.form}>
          <Checkbox checked={nameCheck} onChange={setNameCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="Name" className = {styles.input} value={formData.Name} onChange={handleChange} disabled = {!nameCheck} required />
              <label htmlFor="name" className = {styles.inputLabel}>Name</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={genderCheck} onChange={setGenderCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="Gender" className = {styles.input} value={formData.Gender} onChange={handleChange} disabled = {!genderCheck} required />
              <label htmlFor="Gender" className = {styles.inputLabel}>Gender</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={birthdayCheck} onChange={setBirthdayCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="Birthday" className = {styles.input} value={formData.Birthday} onChange={handleChange} disabled = {!birthdayCheck} required />
              <label htmlFor="Birthday" className = {styles.inputLabel}>Birthday</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={universityCheck} onChange={setUniversityCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="University" className = {styles.input} value={formData.University} onChange={handleChange} disabled = {!universityCheck} required />
              <label htmlFor="University" className = {styles.inputLabel}>University</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={studentIdCheck} onChange={setStudentIdCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="StudentId" className = {styles.input} value={formData.StudentId} onChange={handleChange} disabled = {!studentIdCheck} required />
              <label htmlFor="StudentId" className = {styles.inputLabel}>StudentId</label>
              <span className = {styles.span}></span>
            </div> 
          </Checkbox>
          <Checkbox checked={majorCheck} onChange={setMajorCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="Major" className = {styles.input} value={formData.Major} onChange={handleChange} disabled = {!majorCheck} required />
              <label htmlFor="Major" className = {styles.inputLabel}>Major</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={admissionCheck} onChange={setAdmissionCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="AdmissionDate" className = {styles.input} value={formData.AdmissionDate} onChange={handleChange} disabled = {!admissionCheck} required />
              <label htmlFor="AdmissionDate" className = {styles.inputLabel}>AdmissionDate</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={graduationCheck} onChange={setGraduationCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="GraduationDate" className = {styles.input} value={formData.GraduationDate} onChange={handleChange} disabled = {!graduationCheck} required />
              <label htmlFor="GraduationDate" className = {styles.inputLabel}>GraduationDate</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={overallGradeCheck} onChange={setOverallGradeCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="OverallGrade" className = {styles.input} value={formData.OverallGrade} onChange={handleChange} disabled = {!overallGradeCheck} required />
              <label htmlFor="OverallGrade" className = {styles.inputLabel}>OverallGrade</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={majorGradeCheck} onChange={setMajorGradeCheck}>
            <div className = {styles.inputdiv}>
              <input type="text" name="MajorGrade" className = {styles.input} value={formData.MajorGrade} onChange={handleChange} disabled = {!majorGradeCheck} required />
              <label htmlFor="MajorGrade" className = {styles.inputLabel}>MajorGrade</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <button type="submit" className ={styles.btn}>Check Hash Validity</button>
        </form>
        <div>
          {hashBool !== '' && (
            <pre className = {styles.message}>{hashBool}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyHash;
