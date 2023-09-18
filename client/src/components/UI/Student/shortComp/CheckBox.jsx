import styles from "./CheckBox.module.css";

function Checkbox({ children, disabled, checked, onChange }) {
    return (
      <div className = {styles.body}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
          className = {styles.cbox}
        />
        <div className ={styles.cboxlabel}>{children}</div>
      </div>
    );
  }

export default Checkbox;