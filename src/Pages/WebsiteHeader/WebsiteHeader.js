import axios from "axios";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import { base_url } from "../../Assets/Base_Url";
import "./WebsiteHeader.css";
import {toast, ToastContainer} from "react-toastify";

function WebsiteHeader() {
  const {t} = useTranslation();
  const token = localStorage.getItem("token")

  const [data , setData] = useState(
    {
      app_description:{
        en:"",
        de:"",
        ar:""
      },
      app_name:{
        en:"",
        de:"",
        ar:""
      },
      email:"",
      phone:""
    }
  )

  const getData = ()=>{
    axios.get(`${base_url}settings/list`)
    .then(res=>{
      setData(res.data.data)
      console.log(res.data.data)
    })
  }

  // handle change
  const handleChange = (e, key, lang) => {
    setData(prev => ({
      ...prev,
      [key]: lang ? { ...prev[key], [lang]: e.target.value } : e.target.value,
    }));
  };


  const updatedData = {
    app_name: data.app_name,
    app_description: data.app_description,
    email: data.email,
    phone: data.phone,
  }

  const handleUpdate = ()=>{
    console.log(updatedData)
    axios.put(`${base_url}settings/update`,updatedData,{
      headers:{
        Authorization: `Bearer ${token}`, // Include the token in the headers
      }
    })
    .then((res)=>{
      toast.success(res.data.message)
      getData()
    })
    .catch((error)=>{
      toast.error("failed updated")
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='websiteHeader'>
      <ToastContainer/>
      <div className='header'>
        <h2>{t("website_header")}</h2>
        <div>
          <h4>{t("are_you_search_about_social_media_links")}?</h4>
          <a href='/'>{t("click_here")}</a>
        </div>
      </div>

      {/* form */}

      <form action=''>
        <div>
          <h3>{t("website_name")}*</h3>
          <div className='specialInput'>
            <label>{t("website_name_english")}</label>
            <input type='text' value={data?.app_name["en"]} onChange={(e) => handleChange(e, "app_name", "en")} />
          </div>
          <div className='specialInput'>
            <label>{t("website_name_espain")}</label>
            <input type='text' value={data?.app_name["de"]} onChange={(e) => handleChange(e, "app_name", "de")}/>
          </div>
          <div className='specialInput'>
            <label>{t("website_name_arabic")}</label>
            <input type='text' value={data?.app_name["ar"]} onChange={(e) => handleChange(e, "app_name", "ar")}/>
          </div>
        </div>
        <div>
          <h3>{t("website_description")}*</h3>
          <div className='specialInput'>
            <label>{t("website_desc_english")}</label>
            <input type='text' value={data?.app_description["en"]} onChange={(e) => handleChange(e, "app_description", "en")} />
          </div>
          <div className='specialInput'>
            <label>{t("website_desc_espain")}</label>
            <input type='text' value={data?.app_description["de"]} onChange={(e) => handleChange(e, "app_description", "de")}/>
          </div>
          <div className='specialInput'>
            <label>{t("website_desc_arabic")}</label>
            <input type='text' value={data?.app_description["ar"]} onChange={(e) => handleChange(e, "app_description", "ar")} />
          </div>
        </div>
      </form>

      {/*  */}

      <div className="inputs">
        <div className="input">
          <label htmlFor="">{t("email")}</label>
          <input type="email" value={data.email} onChange={(e) => handleChange(e, "email")} />
        </div>
        <div className="input">
          <label htmlFor="">{t("phone")}</label>
          <input type="number" value={data.phone} onChange={(e) => handleChange(e, "phone")}/>
        </div>
      </div>

      <button onClick={()=>handleUpdate()}>{t("save_changes")}</button>
    </div>
  );
}
export default WebsiteHeader;
