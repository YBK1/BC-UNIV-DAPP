import styles from "./StudentTitle.module.css";

function StudentTitle({onButtonClick}) {
    return (
      <div className = {styles.buttonContainer}> 
        <button onClick={() => onButtonClick('Registry')}>Registry</button>
        <button onClick={() => onButtonClick('Receiving')}>Receiving</button>
        <button onClick={() => onButtonClick('DecodeFile')}>Decodeing</button>
        <button onClick={() => onButtonClick('SettingPDF')}>SettingPDF</button>
      </div>
    );
  }
  
export default StudentTitle;
