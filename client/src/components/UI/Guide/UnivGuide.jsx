import styles from "./Guide.module.css";

function UnivGuide() {

    return (
      <div>
        <div className = {styles.box}>
          <div className = {styles.title}>
              사전 작업
          </div>
          <div className = {styles.main}>
              <p>시스템 이용을 위해 사전에 <a href="https://web3.storage/" target="_blank">Web3.storage</a>의 API Token을 획득해야 합니다. Web3.storage에 회원 가입을 한 후 API 화면으로 이동합니다.</p>
          </div>
          <img className = {styles.imgs} src= "imgs/API.png" alt="API"></img>
          <div className = {styles.main}>
              <p>새로운 API Token을 발급받고, 이 API Token을 증명서 발급시 사용합니다.</p>
          </div>
          <img className = {styles.imgs} src= "imgs/Tokens.png" alt="Tokens"></img>
        </div>
        <div className = {styles.box}>
          <div className = {styles.title}>
              증명서 발급
          </div>
          <div className = {styles.main}>
              <p>University 화면으로 이동하고 발급 대상의 Ethereum Address와 학교의 API Token을 입력합니다.</p><br></br>
              <p>하단에는 발급 대상의 증명서 내용을 입력하고 확인 버튼을 누릅니다.</p>
          </div>
          <img className = {styles.colimg} src= "imgs/Before.png" alt="Before"></img>
          <div className = {styles.main}>
              <p>버튼 클릭 후 처리에 약간의 시간이 소요될 수 있습니다.</p><br></br>
              <p>잠깐의 대기 이후 나타나는 2개의 MetaMask Transaction을 컨펌하면 발급이 완료됩니다.</p>
          </div>
        </div>
      </div>
    );
  }
  
export default UnivGuide;