import './LanguageButtons.css'
import { useState } from "react";
import { Lang } from "../../Assets/SVGS.js";
import i18n from "../../LanguageTranslation/i18";
import { t } from 'i18next';
function LanguageButtons(props){
  const [menuOpen, setMenuOpen] = useState(false); // Language menu toggle
  const toggleLanguageMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang",lang)
    setMenuOpen(false); // Close menu after language selection
  };

  const currentLanguage = i18n.language; // Current language code
  const languages = {
    en: t("en"),
    ar: t("ar"),
    de: t("de"),
  };
  return(
    <div style={{ position: "relative" ,margin:"auto"}}>
          <button onClick={toggleLanguageMenu}  className="lang-button" style={{color:props.btnColor?props.btnColor:"black"}}>
            {languages[currentLanguage]} <Lang color={props.btnColor}/>
          </button>
          {menuOpen && (
            <div className="language-menu">
              {Object.entries(languages).map(([langCode, langName]) => {
                if (langCode !== currentLanguage) {
                  return (
                    <button
                      // style={{color:props.btnColor}}
                      key={langCode}
                      onClick={() => changeLanguage(langCode)}
                      className="lang-option"
                    >
                      {langName}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
  )
}
export default LanguageButtons