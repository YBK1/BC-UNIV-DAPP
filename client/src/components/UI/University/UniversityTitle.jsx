import useEth from "../../../contexts/EthContext/useEth";
import styles from "./UniversityTitle.module.css";

function UniversityTitle() {
  const { state: { contracts, accounts } } = useEth();

  const setAcc = async () => {
    await contracts[1].methods.setVerifiedUniversity(accounts[0]).send({ from: accounts[0] });
  };

    return (
        <div className = {styles.body}>
          <h2>학생의 개인정보를 입력하고 암호화 파일을 생성합니다.</h2>
          <button  className = {styles.btn} onClick = {() => setAcc()}>Set Univ</button>
        </div>
    );
  }
  
export default UniversityTitle;