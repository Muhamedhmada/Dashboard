import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EyeSlash, Eye } from "../../Assets/SVGS.js";
import axios from "axios";
// import i18n from "../../LanguageTranslation/i18";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import LanguageButtons from "../../Components/LanguageButtons/LanguageButtons.js";
import logo from "../../Assets/Images/logo_converted.jpg";
function Login() {
  const nav = useNavigate("");
  const { t } = useTranslation(); // Get the translation function from i18next
  const [pass, showPass] = useState(false);
  const [userData , setUserData] = useState({
    mailValue:"admin@gmail.com",
    passValue:"12345678"
  })



  const [loader , setLoader] = useState(false)

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(userData);
    
    if(!userData.mailValue){
      toast.error(t("emailIsRequired"))
      return
    }
    if(!userData.passValue){
      toast.error(t("passIsRequired"))
      return
    }
    setLoader(true)
    axios
      .post("https://xproject.shaarapp.com/api/admin/login", {
        password: userData.passValue,
        email: userData.mailValue,
      })
      .then((res) => {
        if (res.data?.data?.token) {
          localStorage.setItem("token", res.data.data.token);
          nav("/home");
        }
        setLoader(false)
      })
      .catch((error) => {
        toast.error(t("passError"))
        localStorage.removeItem("token");
        setLoader(false)
      });
  };

  const handleClick = () => {
    showPass(!pass);
  };

  return (
    <div className="login-container">
      <ToastContainer/>
      <div className="content">
        <div className="image">
          <img
            src={logo}
            style={{height:"78px", width:"238px"}}
            // src="https://last-version-of-store.vercel.app/static/media/logo.0aac528f8ddea5e58747.png"
            alt="Logo"
          />
        </div>
        <form action="post">
          <div>
            <h2>{t("description")}</h2>
            <p>{t("enter_credentials")}</p>
          </div>
          <div className="specialInput">
            <label htmlFor="email">{t("email")}</label>
            <input
              id="email"
              type="email"
              value={userData.mailValue}
              onChange={(e) => setUserData((prev)=>({...prev,mailValue:e.target.value}))}
            />
          </div>
          <div className="passInput specialInput">
            <label htmlFor="pass">{t("password")}</label>
            <input
              id="pass"
              value={userData.passValue}
              onChange={(e) =>  setUserData((prev)=>({...prev,passValue:e.target.value}))}
              type={pass ? "text" : "password"}
            />
            <div className="icon" onClick={() => handleClick()}>
              {pass ? <Eye color="#686767" width="20px"/> : <EyeSlash color="#686767" width="20px"/>}
            </div>
          </div>
          <button type="submit" onClick={handleSumbit} disabled={loader}>
            {loader?<Spin indicator={<LoadingOutlined spin />} size="large" />:t("login_button")}
          </button>
          <span>{t("back_to_home")}</span>
        </form>

        {/* Language Switcher */}
        <LanguageButtons btnColor="black"/>
      </div>
    </div>
  );
}

export default Login;
