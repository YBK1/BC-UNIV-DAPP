import { useState } from "react";
import styles from "./Guide.module.css";
import DefaultGuide from "./DefaultGuide";
import StudentGuide from "./StudentGuide";
import UnivGuide from "./UnivGuide";
import VerifyGuide from "./VerifyGuide";

function Guide(props) {
  const [guideComponent] = useState(props.v);

  const rendering = () => {
    if (guideComponent === 'default'){
      return <DefaultGuide/>;
    } else if (guideComponent === 'studentGuide') {
      return <StudentGuide />;
    } else if (guideComponent === 'univGuide') {
      return <UnivGuide/>;
    } else if (guideComponent === 'verifyGuide') {
      return <VerifyGuide />;
    }
    return null;
  };

    return (
      <div className = {styles.index}>
        {rendering(guideComponent)}
      </div>
    );
  }
  
export default Guide;