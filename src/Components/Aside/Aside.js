import "./Aside.css";
import {Bag, Cart, Category, Footer, Header, Image, Mail, Screen, Users, World} from "../../Assets/SVGS";
import {useTranslation} from "react-i18next";
import {AngleLeft, AngleRight} from "../../Assets/SVGS";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../LanguageTranslation/i18";


import logo from "../../Assets/Images/logo_converted.jpg";

function Aside(props) {

  const nav = useNavigate()
  const {t} = useTranslation();
  const lang = i18n.language

  const [showLinks, setShowLinks] = useState(false);

  const handleIcon = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <>
      <div
        className={
          props.close ? "closed aside-container" : "opened aside-container"
        }
      >
        <aside className={props.close ? "closed" : "opened"}>
          <div className='image'>
            <img
              src={logo}
              style={{height:"78px", width:"238px"}}
              alt='logo'
            />
          </div>
          <ul>
            <li>
              <a href='/home'>
                <Screen width='25px' color='var(--primary-color)' />
                {t("control_panal")}
              </a>
            </li>
            <li>
              <a href='/orders'>
                <Bag width='25px' color='var(--primary-color)' />
                {t("orders")}
              </a>
            </li>
            <li>
              <a href='/messages'>
                <Mail width='25px' color='var(--primary-color)' />
                {t("messages")}
              </a>
            </li>
            <li className='website' onClick={handleIcon}>
              <a href='/#' onClick={(e)=>e.preventDefault()} style={{color:!showLinks?"var(--primary-color)":"black"}}>
                <World width='25px' color='var(--primary-color)' />
                {t("web_site")}
              </a>
              <div className='icon'>
                {
                  lang === "ar"?
                <AngleRight color='black' width='30px' />
                  :
                <AngleLeft color='black' width='30px' />
                }
              </div>
            </li>
            <ul className={showLinks ? "webLinks open" : "webLinks"}>
              <li onClick={()=>nav('/website_header')}><Header width="20px" color="var(--primary-color)" /> {t("website_header")}</li>
              <li onClick={()=>nav('/banner')}><Image width="20px" color="var(--primary-color)" /> {t("banners")}</li>
              <li onClick={()=>nav('/productsCategories')}><Category width="20px" color="var(--primary-color)" />{t("product_categories")}</li>
              <li onClick={()=>nav('/Product')}><Cart width="20px" color="var(--primary-color)" /> {t("products")}</li>
              <li onClick={()=>nav('/contact')}><Mail width="20px" color="var(--primary-color)" />{t("contact_us")}</li>
              <li onClick={()=>nav('/footer')}><Footer width="20px" color="var(--primary-color)" />{t("footer")}</li>
            </ul>
            <li>
              <a href='/user'>
                <Users width='25px' color='var(--primary-color)' />
                {t("users")}
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <div
        className={props.close ? "closeIcon opened" : "closeIcon closed"}
        onClick={props.handleClose}
      >
        {!props.close ? (
          lang==="ar"?
          <AngleLeft width='30px' color='white' />:
          <AngleRight width='30px' color='white' />

        ) : (
          lang==="ar"?

          <AngleRight width='30px' color='white' />
          :
          <AngleLeft width='30px' color='white' />

        )}
      </div>
    </>
  );
}
export default Aside;
