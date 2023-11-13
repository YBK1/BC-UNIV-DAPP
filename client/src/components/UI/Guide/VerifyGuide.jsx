import styles from "./Guide.module.css";

function VerifyGuide() {

    return (
      <div>
        <div className = {styles.box}>
                <div className = {styles.title}>
                    증명서 검증
                </div>
                <div className = {styles.main}>
                    <p>Verifier 화면으로 이동하여 학생이 제출한 PDF의 유효성을 검증할 수 있습니다.</p><br></br>
                    <p>학생의 Ethereum Address와 PDF의 내용을 입력하여 검증합니다.</p>
                </div>
                <img className = {styles.imgs} src= "imgs/Verify.png" alt="Verify"></img>
                <div className = {styles.main}>
                    <p>증명서의 최종 유효성을 확인할 수 있습니다.</p>
                </div>
            </div>
      </div>
    );
  }
  
export default VerifyGuide;