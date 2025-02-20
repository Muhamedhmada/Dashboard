import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail } from '../../../Assets/SVGS'
import './ControlCard.css'
function ControlCard(){
  const {t}=useTranslation()
  const token = localStorage.getItem("token")
  const [data , setData] = useState()
  useEffect(()=>{
    axios.get('https://xproject.shaarapp.com/api/admin/statistics' ,{
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    }},)
    .then(
      (res)=>{
        console.log(res.data.data)
        setData(res.data.data)
      }
    )
  } , [])
  return(
    <div className="controlCard-container">
      <div className="card">
        <div className="info">
          <p>{data?.lastestOrders.length}</p>
          <p>{t("new_orders")}</p>
        </div>
        <Mail color="rgb(43, 187, 43)" width="40px"/>
      </div>
      <div className="card">
        <div className="info">
          <p>{data?.completedOrders}</p>
          <p>{t("completed_orders")}</p>
        </div>
        <Mail color="rgb(43, 187, 43)" width="40px"/>
      </div>
      <div className="card">
        <div className="info">
          <p>{data?.totalProducts}</p>
          <p>{t("all_products")}</p>
        </div>
        <Mail color="rgb(43, 187, 43)" width="40px"/>
      </div>
      <div className="card">
        <div className="info">
          <p>{data?.totalMessages}</p>
          <p>{t("all_messages")}</p>
        </div>
        <Mail color="rgb(43, 187, 43)" width="40px"/>
      </div>
    </div>
  )
}
export default ControlCard