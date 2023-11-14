import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faSchoolFlag, faAddressCard } from '@fortawesome/free-solid-svg-icons';

function Home() {

    return (
      <div className = {styles.container}> 
        <div className = {styles.title}>
          <h1>블록체인과 연동하는 개인정보 자기 주권화 신원 증명 시스템</h1>
        </div>
        <div className = {styles.main}>
            <div className = {styles.grid}>
              <div className = {styles.ingrid}>
                <div className = {styles.iconContainer}>
                  <FontAwesomeIcon className = {styles.icon} icon={faGraduationCap} />
                </div>
                <h3> Student </h3>
                <p>
                  IPFS를 통해서 학교에서 발급하는 암호화된 증명서를 가져오고, 공개범위를 스스로 결정해 PDF파일로 만들어 사용할 수 있습니다.
                </p>
              </div>
              <div className = {styles.ingrid}>
                <div className = {styles.iconContainer}>
                  <FontAwesomeIcon className = {styles.icon} icon={faSchoolFlag} />
                </div>
                <h3> University </h3>
                <p>
                  학생의 증명서 내용을 입력하고 Web3.storage와 연동하여 IPFS에 암호화된 증명서를 저장합니다. 입력한 내용의 검증을 위해 Hash값을 블록체인에 저장합니다.
                </p>
              </div>
              <div className = {styles.ingrid}>
                <div className = {styles.iconContainer}>
                  <FontAwesomeIcon className = {styles.icon} icon={faAddressCard} />
                </div>
                <h3> Verifier </h3>
                <p>
                  만들어진 PDF 파일의 내용을 입력하고 블록체인과 연동해 PDF가 유효한지를 검증할 수 있습니다.
                </p>
              </div>
            </div>
        </div>
      </div>
    );
  }
  
export default Home;

