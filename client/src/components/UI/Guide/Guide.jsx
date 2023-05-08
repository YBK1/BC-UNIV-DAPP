import styles from "./Guide.module.css";

function Guide() {
    return (
      <div className = {styles.box}>
        <h3>1. DID WEB은 MetaMask라고 하는 Ethereum 계좌 관리 확장프로그램을 사용합니다.<br/>
            - MetaMask는 Chrome, Edge, FireFox등의 브라우저에서 사용할 수 있으며<br/>
              &nbsp;&nbsp;MetaMask를 사용하지 않는 브라우저에서는 DID WEB의 사용이 제한될 수 있습니다.<br></br>
            - MetaMask의 홈페이지로 가서 다운로드를 실행합니다.    *이미지 클릭시 홈페이지 이동
        </h3>
        <a href = "https://metamask.io/" target = "blank" > <img className = {styles.imgs} src= "imgs/MetaMask.png" alt="MetaMask"></img> </a>
        <h3>
            2. 
        </h3>
      </div>
    );
  }
  
export default Guide;