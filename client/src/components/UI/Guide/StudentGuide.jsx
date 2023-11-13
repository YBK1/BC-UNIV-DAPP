import styles from "./Guide.module.css";

function StudentGuide() {
    return (
      <div>
        <div className = {styles.box}>
          <div className = {styles.title}>
              사용자 등록
          </div>
          <div className = {styles.main}>
              <p>SignUp 화면으로 이동하고 버튼을 클릭하여 복호화에 이용될 암호화키를 발급 받고 사용자 등록을 진행하세요</p>
          </div>
          <img className = {styles.imgs} src= "imgs/SignUp.png" alt="SignUp"></img>
          <div className = {styles.main}>
            <p>버튼 클릭 후 나타난 두 개의 창에서 다운로드를 받고, MetaMask Transaction을 컨펌처리 합니다.</p>
            <div className = {styles.metamaskbox}>
              <img className = {styles.downloadimg} src= "imgs/keyDownload.png" alt="keyDownload"></img>
              <img className = {styles.rowimg} src= "imgs/Transaction.png" alt="Transaction"></img>
            </div>
          </div>
        </div>
        <div className = {styles.box}>
          <div className = {styles.title}>
            증명서 수령
          </div>
          <div className = {styles.main}>
            <p>Receive 화면으로 이동하여 증명서 발급 여부를 확인할 수 있습니다.</p>
          </div>          
          <img className = {styles.imgs} src= "imgs/Receive.png" alt="Receive"></img>
          <div className = {styles.main}>
            <p>발급이 완료되었다면 주소를 확인할 수 있습니다. 해당 주소로 이동하여 암호화된 증명서와 암호화 요소를 다운로드 합니다.</p>
            <img className = {styles.downloadimg} src= "imgs/Issued.png" alt="Issued"></img>
            <img className = {styles.downloadimg} src= "imgs/IPFS.png" alt="IPFS"></img>
          </div>
        </div>
        <div className = {styles.box}>
          <div className = {styles.title}>
              증명서 복호화 및 PDF 변환
          </div>
          <div className = {styles.main}>
              <p>Decode 화면으로 이동하여 다운로드 받은 증명서와 복호화 요소 그리고 처음 사용자 등록시 발급 받은 Private Key를 입력합니다.</p>
          </div>
          <img className = {styles.imgs} src= "imgs/Decode.png" alt="Decode"></img>
          <div className = {styles.main}>
              <p>복호화 완료시 하단에 증명서의 정보가 표시됩니다. PDF에 포함시키고 싶은 항목을 선택하여 PDF로 변환할 수 있습니다.</p>
          </div>
          <img className = {styles.imgs} src= "imgs/PDF.png" alt="PDF"></img>
        </div>
      </div>
    );
  }
  
export default StudentGuide;