import { useState } from "react";
import { useTranslation } from "react-i18next";
import {User} from "../../Assets/SVGS";
import Aside from "../Aside/Aside";
import LanguageButtons from "../LanguageButtons/LanguageButtons";
import "./Navbar.css";
function Navbar({contentComponent: ContentComponent }) {
  const {t}= useTranslation()


  // aside function
  const [close, setClose] = useState(true);
  const handleClose = () => {
    setClose((prev) => !prev);
  };

  return (
    <>
    <div className="nav-side">
      <Aside close={close} handleClose={handleClose} />
      <div className={close?'navbar-container':'navbar-container close'}>
        <h2 style={{color: "white"}}>{t("control_panal")}</h2>
        <div className='admin'>
          <LanguageButtons btnColor="white" />
          <div className='position'>
            <div className="name">
              <p>Super admin</p>
              <p>مسئول عام</p>
            </div>
          <div className='icon'>
            <User width='30px' color='white' />
          </div>
          </div>
        </div>
      </div>
    </div>
    <div className={close?"pageContent":"pageContent close"}>
      {ContentComponent && <ContentComponent />}
    </div>
    </>

  );
}
export default Navbar;
