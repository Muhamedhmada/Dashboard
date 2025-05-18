import axios from "axios";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";
import {Mail} from "../../../Assets/SVGS";
import "./ControlCard.css";
function ControlCard() {
  const nav = useNavigate()
  const {t} = useTranslation();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("https://xproject.shaarapp.com/api/admin/statistics", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
  }, []);
  return (
    <div className='controlCard-container'>
      <div className='card' onClick={() => nav("/orders")}>
        <div className='info'>
          <p>{data?.lastestOrders.length}</p>
          <p>{t("new_orders")}</p>
        </div>
        <Mail color='var(--primary-color)' width='40px' />
      </div>
      <div className='card'>
        <div className='info'>
          <p>{data?.completedOrders}</p>
          <p>{t("completed_orders")}</p>
        </div>
        <Mail color='var(--primary-color)' width='40px' />
      </div>
      <div className='card' onClick={() => nav("/product")}>
        <div className='info'>
          <p>{data?.totalProducts}</p>
          <p>{t("all_products")}</p>
        </div>
        <Mail color='var(--primary-color)' width='40px' />
      </div>
      <div className='card' onClick={() => nav("/messages")}>
        <div className='info'>
          <p>{data?.totalMessages}</p>
          <p>{t("all_messages")}</p>
        </div>
        <Mail color='var(--primary-color)' width='40px' />
      </div>
    </div>
  );
}
export default ControlCard;
