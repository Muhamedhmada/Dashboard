import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { base_url } from '../../Assets/Base_Url';
import './Footer.css'
import Policy from './FourComponent/Policy/Policy';
import Social from './FourComponent/Social/Social';
import Terms from './FourComponent/Terms/Terms';
import Impressium from './FourComponent/Impressium/Impressium';
function Footer(){
  const {t}=useTranslation()
  const [activeComponent, setActiveComponent] = useState("one");

  const renderComponent = () => {
    switch (activeComponent) {
      case "one":
        return <Social data={data}/>;
      case "two":
        return <Terms data={data} />;
      case "three":
        return <Policy data={data} />;
      case "four":
        return <Impressium data={data} />;
      default:
        return <div>Select a component</div>;
    }
  };

  const [data , setData] = useState()
  const getData = ()=>{
    axios.get(`${base_url}settings/list`)
    .then((res)=>{
      console.log(res)
      setData(res.data.data)
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return(
    <div className="footer-container">
      <div className="header">
        <h2>{t("footer page content")}</h2>
        <h4>{t("modify the contents of your website pages")}</h4>
        <div className="btns">
          <button onClick={()=>setActiveComponent("four")}>{t("impressium")}</button>
          <button onClick={()=>setActiveComponent("two")}>{t("terms")}</button>
          <button onClick={()=>setActiveComponent("three")}>{t("privacy")}</button>
          <button onClick={()=>setActiveComponent("one")}>{t("social media links")}</button>
        </div>
      </div>
      <motion.div
       key={activeComponent} // Ensures re-animation when page changes
       initial={{opacity: 0, x: 50}}
       animate={{opacity: 1, x: 0}}
       exit={{opacity: 0, x: -50}}
       transition={{duration: 0.5, ease: "easeInOut"}}
      >
        {renderComponent()}
      </motion.div>
    </div>
  )
}
export default Footer