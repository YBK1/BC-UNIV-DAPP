import React, { useState } from 'react';
import useEth from "../../../contexts/EthContext/useEth";
import styles from "./VerifyHash.module.css";
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
  const [finalBool, setFinalBool] = useState('최종 결과 : 유효');

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
              setFinalBool('최종 결과: 무효');
            }
          }
          index += 1;
      }
    }
    setHashBool(result);
    alert('검증이 완료되었습니다! 결과를 확인하세요');
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
    <div className = {styles.container}>
      <div className = {styles.title}>
          Verify Certificate
      </div>
      <div className = {styles.main}>
          <p>PDF를 받았다면 여기에서 내용을 검증해보세요</p>
          <p>검증하고 싶은 항목을 선택하고 유효한 내용인지를 확인할 수 있습니다.</p>
      </div>
      <div className = {styles.body}>
        <div className = {styles.addressinput}>
          <div className = {styles.main}>
            <p>검증 대상의 주소를 입력해주세요</p>
          </div>
          <div className = {styles.optiondiv}>
            <input type="text" name="Address" className = {styles.option} value={userAddress} onChange={handleAddressChange} required />
            <label htmlFor="Address" className = {styles.optionLabel}>Ethereum Address of Student</label>
            <span className = {styles.span}></span>
          </div>
        </div>
        <div className = {styles.main}>
          <p>검증이 필요한 항목을 체크하고 내용을 입력하여 증명서가 유효한지 확인해보세요</p>
        </div>
        <form onSubmit={handleSubmit} className = {styles.form}>
          <Checkbox checked={nameCheck} onChange={setNameCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="Name" className = {styles.option} value={formData.Name} onChange={handleChange} disabled = {!nameCheck} required />
              <label htmlFor="name" className = {styles.optionLabel}>Name</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={genderCheck} onChange={setGenderCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="Gender" className = {styles.option} value={formData.Gender} onChange={handleChange} disabled = {!genderCheck} required />
              <label htmlFor="Gender" className = {styles.optionLabel}>Gender</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={birthdayCheck} onChange={setBirthdayCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="Birthday" className = {styles.option} value={formData.Birthday} onChange={handleChange} disabled = {!birthdayCheck} required />
              <label htmlFor="Birthday" className = {styles.optionLabel}>Birthday</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={universityCheck} onChange={setUniversityCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="University" className = {styles.option} value={formData.University} onChange={handleChange} disabled = {!universityCheck} required />
              <label htmlFor="University" className = {styles.optionLabel}>University</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={studentIdCheck} onChange={setStudentIdCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="StudentId" className = {styles.option} value={formData.StudentId} onChange={handleChange} disabled = {!studentIdCheck} required />
              <label htmlFor="StudentId" className = {styles.optionLabel}>StudentId</label>
              <span className = {styles.span}></span>
            </div> 
          </Checkbox>
          <Checkbox checked={majorCheck} onChange={setMajorCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="Major" className = {styles.option} value={formData.Major} onChange={handleChange} disabled = {!majorCheck} required />
              <label htmlFor="Major" className = {styles.optionLabel}>Major</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={admissionCheck} onChange={setAdmissionCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="AdmissionDate" className = {styles.option} value={formData.AdmissionDate} onChange={handleChange} disabled = {!admissionCheck} required />
              <label htmlFor="AdmissionDate" className = {styles.optionLabel}>AdmissionDate</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={graduationCheck} onChange={setGraduationCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="GraduationDate" className = {styles.option} value={formData.GraduationDate} onChange={handleChange} disabled = {!graduationCheck} required />
              <label htmlFor="GraduationDate" className = {styles.optionLabel}>GraduationDate</label>
              <span className = {styles.span}></span>
            </div>  
          </Checkbox>
          <Checkbox checked={overallGradeCheck} onChange={setOverallGradeCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="OverallGrade" className = {styles.option} value={formData.OverallGrade} onChange={handleChange} disabled = {!overallGradeCheck} required />
              <label htmlFor="OverallGrade" className = {styles.optionLabel}>OverallGrade</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <Checkbox checked={majorGradeCheck} onChange={setMajorGradeCheck}>
            <div className = {styles.optiondiv}>
              <input type="text" name="MajorGrade" className = {styles.option} value={formData.MajorGrade} onChange={handleChange} disabled = {!majorGradeCheck} required />
              <label htmlFor="MajorGrade" className = {styles.optionLabel}>MajorGrade</label>
              <span className = {styles.span}></span>
            </div>
          </Checkbox>
          <div className = {styles.btnContainer}>
            <button type="submit" className = {styles.btn}>검증하기</button>
          </div>
        </form>
      </div>
      <div className = {styles.messagebox}>
        {hashBool !== '' && (
        <pre className = {styles.result}>
          {finalBool}
        </pre>)}
        {hashBool !== '' && (
         <pre className = {styles.detail}>{hashBool}</pre>
        )}
      </div>
    </div>
  );
};

export default VerifyHash;
