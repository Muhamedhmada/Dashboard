  import { motion } from "framer-motion";
import { t } from "i18next";
import { Exit } from "../../Assets/SVGS";
  import './Modal.css'
  const Modal = ({ isOpen, onClose, children , modalTitle , CancelBtn , AcceptBtn  ,showModalsBtns , handleAdd , handleCancel  , checked , setChecked}) => {
    if (!isOpen) return null; // Hide the modal when it's closed
    return (
      <div className="modal-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="modal"
        >
          <div className="modalHeader">
            <button className="btnCloseModal"
              onClick={onClose}
            >
              <Exit color="black" width="20"/>
            </button>
            <h2>{modalTitle}</h2>
          </div>
          {children}

          {showModalsBtns?<div className="modalBtns">
            <div style={{display:"flex" , gap:"10px" , alignItems:"center"}}>
              <div className="toggle-switch" >
                <input className="toggle-input" onClick={()=>setChecked((prev)=>!prev)} checked = {checked} id="toggle" type="checkbox" />
                <label className="toggle-label" for="toggle"></label>
              </div>
              <p style={{fontSize:"20px" , color:"rgb(43, 187, 43)"}}>{checked?t("active"):t("un_active")}</p>
            </div>
            <div className="btns">
              <button onClick={handleCancel}>{CancelBtn}</button>
              <button onClick={handleAdd}>{AcceptBtn}</button>
            </div>
          </div>:null}
        </motion.div>


      </div>
    );
  };

  export default Modal;
