import './RichText.css'
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useTranslation } from 'react-i18next';
import i18n from '../../LanguageTranslation/i18';
function RichText({header , saveFunc , checked , pageActive , pageUnActive , handleChecked , pageContent , data}){
  const {t}=useTranslation()
  const lang  = i18n.language
  const [btnLang  , setBtnLang] = useState(lang)
  const editor = useRef(null);
	const [content, setContent] = useState({
    en:data?.en,
    de:data?.de,
    ar:data?.ar
  });

  console.log(content)
  console.log(data)
  const config = useMemo(
    () => ({
      readonly: false, // Make it editable
      height: 400, // Editor height
      placeholder:t("richText placeHolder"),
      toolbarAdaptive: false, // Show full toolbar
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      uploader: { insertImageAsBase64URI: true }, // Allow image uploads
    }),
    []
  );

  return (
    <>
      <div className='richText-container'>
        <header>
          <h2>{t(header)}</h2>
        </header>
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <div className='toggle-switch'>
            <input
              className='toggle-input'
              onClick={handleChecked}
              checked={checked}
              id='toggle-one'
              type='checkbox'
            />
            <label className='toggle-label' for='toggle-one'></label>
          </div>
          <p style={{fontSize: "16px", color: "rgb(43, 187, 43)"}}>
            {checked ? t(pageActive) : t(pageUnActive)}
          </p>
        </div>
        <div className='content'>
          <p style={{fontSize:"18px" ,textTransform:"capitalize", fontWeight:"bold"}}>{t(pageContent?.[btnLang])}</p>
          <div className="btns">
            <button onClick={()=>setBtnLang("en")}>{t("en")}</button>
            <button onClick={()=>setBtnLang("ar")}>{t("ar")}</button>
            <button onClick={()=>setBtnLang("de")}>{t("de")}</button>
          </div>
        </div>
        {
          data?
          <JoditEditor
            ref={editor}
            value={data?.[btnLang]}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent((prev)=>({...prev , [btnLang]:newContent}))} // preferred to use only this option to update the content for performance reasons
            // onChange={(newContent) => setContent((prev)=>({...prev , btnLang:newContent}))}
          />
          :t("loading")
        }

        <button onClick={saveFunc}>{t("save_changes")}</button>
      </div>
    </>
  );
}
export default RichText
