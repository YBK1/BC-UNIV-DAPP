import { useState } from "react";
import styles from "./SettingPDF.module.css";
import useEth from "../../../contexts/EthContext/useEth";
import Checkbox from "./shortComp/CheckBox";
import { jsPDF } from "jspdf";
import MapleFont from './shortComp/MapleFont.js';

function SettingPDF(props){
    const { state: { accounts } } = useEth();

    const [genderCheck, setGenderCheck] = useState(false);
    const [birthdayCheck, setBirthdayCheck] = useState(false);
    const [majorCheck, setMajorCheck] = useState(false);
    const [admissionCheck, setAdmissionCheck] = useState(false);
    const [graduationCheck, setGraduationCheck] = useState(false);
    const [overallGradeCheck, setOverallGradeCheck] = useState(false);
    const [majorGradeCheck, setMajorGradeCheck] = useState(false);

    const printPDF = async () => {
      const doc = new jsPDF("p", "mm", "a4");

      doc.addFileToVFS('malgun.ttf', MapleFont);  //_fonts 변수는 Base64 형태로 변환된 내용입니다.
      doc.addFont('malgun.ttf','malgun', 'normal');
      doc.setFont('malgun'); 
    
      doc.setFontSize(8);
      doc.text(150, 20, 'Verified credential from didweb');
      doc.line(15, 25, 195, 25); // 선그리기(시작x, 시작y, 종료x, 종료y)
      doc.line(15, 290, 195, 290); // 선그리기(시작x, 시작y, 종료x, 종료y)
      doc.text(153, 30, 'Ethereum Address of Student');
      doc.setFontSize(10);
      doc.text(105, 35, accounts[0]);
      
      doc.setFontSize(15);
    
      const checkStates = [true, genderCheck, birthdayCheck, true, true, majorCheck, admissionCheck, graduationCheck, overallGradeCheck, majorGradeCheck];
    
      let yvalue = 70; let stateIndex = 0;
      for (const key in props.vc) {
        if (props.vc.hasOwnProperty(key)) {
          const value = props.vc[key];
            if(checkStates[stateIndex] === true){
              doc.text(20, yvalue, key + ':');
              doc.text(90, yvalue, value);
            }
            else{
              doc.text(20, yvalue, key + ':');
              doc.text(90, yvalue, '공개하지않음');
            }
            yvalue += 13;
            stateIndex += 1;
        }
      }
    
      doc.save('증명서.pdf');  //결과 출력
    }

    return (
      <div>
        <div className = {styles.main}>
          <p>좌측에 표시되는 증명서의 내용이 정확한지 꼭 확인하세요</p>
          <p>확인했다면, PDF파일에 포함시킬 내용을 선택하고 PDF파일을 만들어보세요</p>
        </div>
        <div className = {styles.body}>
          <div className = {styles.leftBox}>
            {props.vc && (
              <pre className = {styles.json}>{JSON.stringify(props.vc, null, 2)}</pre>
            )}
          </div>
          <div className = {styles.rightBox}>
            <article className = {styles.container}>
              <header className = {styles.header}>
                <h1 className = {styles.head}>PDF에서 포함 시킬 항목을 선택하세요</h1>
              </header>
              <div className ={styles.checkboxContainer}>
                <Checkbox checked={genderCheck} onChange={setGenderCheck}>
                  성별
                </Checkbox>
                <Checkbox checked={birthdayCheck} onChange={setBirthdayCheck}>
                  생년월일
                </Checkbox>
                <Checkbox checked={majorCheck} onChange={setMajorCheck}>
                  전공
                </Checkbox>
                <Checkbox checked={admissionCheck} onChange={setAdmissionCheck}>
                  입학일자
                </Checkbox>
                <Checkbox checked={graduationCheck} onChange={setGraduationCheck}>
                  졸업일자
                </Checkbox>
                <Checkbox checked={overallGradeCheck} onChange={setOverallGradeCheck}>
                  전체평점
                </Checkbox>
                <Checkbox checked={majorGradeCheck} onChange={setMajorGradeCheck}>
                  전공평점
                </Checkbox>
              </div>
            </article>
          </div>
        </div>
        <footer className = {styles.footer}>
          <button className = {styles.btn} onClick = {printPDF}>PDF 생성하기</button>
        </footer>
      </div>
    );
}

export default SettingPDF;