import styles from "./Guide.module.css";

function DefaultGuide() {
    return (
        <div>
            <div className = {styles.box}>
                <div className = {styles.title}>
                    기본설정
                </div>
                <div className = {styles.main}>
                    <p>시스템 이용을 위해선 2가지의 기본 조건이 필요합니다. 크롬 브라우저를 사용해야하고, Metamask 확장 프로그램이 필요합니다.</p>
                </div>
            </div>
            <div className = {styles.box}>
                <div className = {styles.title}>
                    MetaMask 설치
                </div>
                <div className = {styles.main}>
                    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">https://metamask.io/</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;MetaMask 공식 홈페이지로 이동하여 확장 프로그램을 다운로드합니다.
                </div>
                <a href = "https://metamask.io/" target = "blank" > <img className = {styles.imgs} src= "imgs/MetaMask.png" alt="MetaMask"></img> </a>
            </div>
            <div className = {styles.box}>
                <div className = {styles.title}>
                    계정 생성 및 웹사이트 연결
                </div>
                <div className = {styles.main}>
                    <p>MetaMask를 통해 Ethereum Account를 생성하고 웹사이트와 연결해야 하며 네트워크를 설정해 줍니다.</p>
                    <div className = {styles.metamaskbox}>
                        <img className = {styles.rowimg} src= "imgs/Account.png" alt="Account"></img>
                        <img className = {styles.rowimg} src= "imgs/Connect.png" alt="Connect"></img>
                        <img className = {styles.rowimg} src= "imgs/Sepolia.png" alt="Sepolia"></img>
                    </div>
                </div>
            </div>
            <div className = {styles.box}>
                <div className = {styles.title}>
                    기본설정이 완료되었습니다!
                </div>
                <div className = {styles.main}>
                    문제가 발생했을 경우 <a href = "https://metamask.io/institutions/" target = "blank">MetaMask의 Institution</a>을 참고하세요.
                </div>
            </div>
        </div>
    );
  }
  
export default DefaultGuide;