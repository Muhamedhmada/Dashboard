import {Delete, Edit, Eye, EyeSlash, Location, Plus} from "../../Assets/SVGS";
import "./Contact.css";
import Map from "../../Components/Map/Map";
import {useEffect, useState} from "react";
import Modal from "../../CustomComponents/Modal/Modal";
import axios from "axios";
import { base_url } from "../../Assets/Base_Url";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
function Contact() {
  const {t} = useTranslation()
  const [pass , showPass] = useState(true)
  const [loading , setLoading] = useState("")
  const [pageLoading , setPageLoading] = useState("")
  const [data , setData] = useState({
    latitude:"",
    longitude:"",
    contact_us_emails:"",
    enable_contact_us_form:false,
    order_emails:"",
    order_status:false,
    recaptcha_key:"",
    recaptcha_status:false,

  })
  const token = localStorage.getItem("token")

  const [isOpenOrderMail , setIsOpenOrderMail] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData((prev)=>({...prev,
            longitude: (position.coords.longitude).toString(),
            latitude: (position.coords.latitude).toString(),
          }));
        },
        (error) => console.error("Error getting location:", error),
        {enableHighAccuracy: true}
      );
    }
  };

  const getData = ()=>{
    setPageLoading(true)
    axios.get(`${base_url}settings/list`)
    .then((res)=>{
      setData(()=>({
        latitude:res.data?.data?.latitude,
        longitude:res.data?.data?.longitude,
        contact_us_emails:res.data?.data?.contact_us_emails,
        enable_contact_us_form:res.data.data.enable_contact_us_form ,
        order_emails:res.data?.data?.order_emails,
        order_status:res.data.data.order_status,
        recaptcha_key:res.data.data.recaptcha_key,
        recaptcha_status:res.data.data.recaptcha_status,

      }))
    })
    .catch(error=>console.log(error))
    .finally(res=>setPageLoading(false))
  }

  // update data

  const handleEdit=()=>{
    // return
    setLoading(true);
    axios
      .put(`${base_url}settings/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.data.message);
        getData();
      })
      .catch((error) => {
        toast.error(t("error_message"));
      })
      .finally((res) => setLoading(false));
  }
  useEffect(()=>{
    getData()
  },[])
  return !data ? (
    <p>{t("loading")}</p>
  ) : (
    <div className='contact-container'>
      <ToastContainer />
      <header>
        <div className='header'>
          <h2 className=''>{t("contact_us_section")}</h2>
          <p>{t("your_location_on_map")}</p>
          <div className='location'>
            <input
              type='text'
              value={data?.longitude}
              onChange={(e) =>
                setData((prev) => ({...prev, longitude: (e.target.value).toString()}))
              }
              placeholder='enter langitude'
            />
            <input
              type='text'
              value={data?.latitude}
              onChange={(e) =>
                setData((prev) => ({...prev, latitude: (e.target.value).toString()}))
              }
              placeholder='enter latitude'
            />
            <button onClick={getCurrentLocation}>
              {t("current_location")}
              <Location width='25px' color='white' />
            </button>
            <button onClick={() => setIsOpen(true)}>
              {t("preview")} <Eye color='white' width='25px' />
            </button>
          </div>
        </div>
        <p>
          <span style={{fontWeight: "bold"}}>{t("note")}:</span>{" "}
          {t("notePragraph")}
        </p>
        <Map
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          lat={data.latitude}
          lng={data.longitude}
        />
      </header>
      <div className='customer'>
        <div>
          <h3>{t("Enable_customers_to_contact_you")}</h3>
          <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className='toggle-switch'>
              <input
                className='toggle-input'
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    enable_contact_us_form: !prev.enable_contact_us_form,
                  }))
                }
                checked={data.enable_contact_us_form}
                id='toggle-one'
                type='checkbox'
              />
              <label className='toggle-label' for='toggle-one'></label>
            </div>
            <p style={{fontSize: "20px", color: "rgb(43, 187, 43)"}}>
              {data.enable_contact_us_form
                ? t("contact_us_page_enabled")
                : t("contact_us_page_unenabled")}
            </p>
          </div>
          <div className='input specialInput'>
            <div>
              <label>{t("Emails_to_receive_contact_messages")}</label>
              <input type='text' value={data.contact_us_emails[0]} />
            </div>
            <div className='icons'>
              <div className='icon'>
                <Edit color='black' width='20px' />
              </div>
              <div className='icon'>
                <Delete color='black' width='20px' />
              </div>
            </div>
          </div>
          <button>
            <Plus color='white' width='25px' />
            {t("add_new_email")}
          </button>
        </div>
        <div>
          <h3>{t("Enable_customers_to_order")}</h3>
          <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className='toggle-switch'>
              <input
                className='toggle-input'
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    order_status: !prev.order_status,
                  }))
                }
                checked={data.order_status}
                id='toggle-two'
                type='checkbox'
              />
              <label className='toggle-label' for='toggle-two'></label>
            </div>
            <p style={{fontSize: "20px", color: "rgb(43, 187, 43)"}}>
              {data.order_status ? t("active") : t("un_active")}
            </p>
          </div>
          <div className='input specialInput'>
            <div>
              <label>{t("Emails_to_receive_client_orders")}</label>
              <input type='text' value={data.contact_us_emails[0]} />
            </div>
            <div className='icons'>
              <div className='icon' onClick={() => setIsOpenOrderMail(true)}>
                <Edit color='black' width='20px' />
              </div>
              <div className='icon'>
                <Delete color='black' width='20px' />
              </div>
            </div>
          </div>
          <button>
            <Plus color='white' width='25px' />
            {t("add_new_email")}
          </button>
        </div>
        <div>
          <h3>{t("spam")}</h3>
          <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className='toggle-switch'>
              <input
                className='toggle-input'
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    recaptcha_status: !prev.recaptcha_status,
                  }))
                }
                checked={data.recaptcha_status}
                id='toggle-three'
                type='checkbox'
              />
              <label className='toggle-label' for='toggle-three'></label>
            </div>
            <p style={{fontSize: "20px", color: "rgb(43, 187, 43)"}}>
              {data.recaptcha_status ? t("active") : t("un_active")}
            </p>
          </div>

          <div className='specialInput passInput'>
            <label htmlFor=''>{t("recapatch_API_secret_key")}</label>
            <input type={pass ? "password" : "text"} value={data.recaptcha_key} />
            <div className='icon' onClick={() => showPass(!pass)}>
              {pass ? (
                <EyeSlash color='black' width='20px' />
              ) : (
                <Eye color='black' width='20px' />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      {/* orer mail edit  */}
      <Modal
        style={{width: "400px"}}
        isOpen={isOpenOrderMail}
        onClose={() => setIsOpenOrderMail(false)}
        modalTitle='Edit email'
      >
        <input type='email' value={data.order_emails[0]} />
        <div
          className='btns'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "30px 0",
          }}
        >
          <button>SAVE</button>
          <button style={{backgroundColor: "transparent", color: "black"}}>
            DISCARD
          </button>
        </div>
      </Modal>
      <button
        disabled={loading}
        onClick={() => handleEdit()}
        style={{marginTop: "100px"}}
      >
        {loading ? (
          <Spin
            indicator={
              <LoadingOutlined style={{fontSize: 24, color: "white"}} spin />
            }
            size='small'
          />
        ) : (
          t("save_changes")
        )}
      </button>
    </div>
  );
}
export default Contact;
