import "./Aside.css";
import {Bag, Cart, Category, Footer, Header, Image, Mail, Screen, Users, World} from "../../Assets/SVGS";
import {useTranslation} from "react-i18next";
import {AngleLeft, AngleRight} from "../../Assets/SVGS";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../LanguageTranslation/i18";
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
              src='https://last-version-of-store.vercel.app/static/media/logo.0aac528f8ddea5e58747.png'
              alt='logo'
            />
          </div>
          <ul>
            <li>
              <a href='/home'>
                <Screen width='25px' color='rgb(43, 187, 43)' />
                {t("control_panal")}
              </a>
            </li>
            <li>
              <a href='/orders'>
                <Bag width='25px' color='rgb(43, 187, 43)' />
                {t("orders")}
              </a>
            </li>
            <li>
              <a href='/home'>
                <Mail width='25px' color='rgb(43, 187, 43)' />
                {t("messages")}
              </a>
            </li>
            <li className='website' onClick={handleIcon}>
              <a href='/#' onClick={(e)=>e.preventDefault()} style={{color:showLinks?"rgb(43, 187, 43)":"black"}}>
                <World width='25px' color='rgb(43, 187, 43)' />
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
              {/* <li><User width="25px" color="rgb(43, 187, 43)" /> website header</li> */}
              <li onClick={()=>nav('/website_header')}><Header width="20px" color="rgb(43, 187, 43)" /> {t("website_header")}</li>
              <li onClick={()=>nav('/banner')}><Image width="20px" color="rgb(43, 187, 43)" /> {t("banners")}</li>
              <li onClick={()=>nav('/productsCategories')}><Category width="20px" color="rgb(43, 187, 43)" />{t("product_categories")}</li>
              <li onClick={()=>nav('/Product')}><Cart width="20px" color="rgb(43, 187, 43)" /> {t("products")}</li>
              <li onClick={()=>nav('/contact')}><Mail width="20px" color="rgb(43, 187, 43)" />{t("contact_us")}</li>
              <li onClick={()=>nav('/footer')}><Footer width="20px" color="rgb(43, 187, 43)" />{t("footer")}</li>
            </ul>
            <li>
              <a href='/user'>
                <Users width='25px' color='rgb(43, 187, 43)' />
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
