import axios from "axios";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Call, Eye, Mail, User} from "../../Assets/SVGS";
import Header from "../../CustomComponents/Header/Header";
import Modal from "../../CustomComponents/Modal/Modal";
import CustomTable from "../../CustomComponents/Table/Table";
import i18n from "../../LanguageTranslation/i18";
import "./LastMessage.css";
function LastMessage() {
  const nav = useNavigate();

  const lang = i18n.language;
  const {t} = useTranslation();

  const tableHeaders = [
    `${t("name")}`,
    `${t("order_status")}`,
    `${t("tools")}`,
  ];
  const tableKeys = ["name", "order_status"];
  const [rowData, setRowData] = useState();

  // to open and close modal
  const [isShowProductInfo, setIsShowProductInfo] = useState(false);

  const [data, setData] = useState();

  // token
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://xproject.shaarapp.com/api/order/list?page=1&per_page=12", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data.orders);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className='lastMessage-container'>
      <div className='lastMessage-content orders'>
        <Header
          header={t("messages")}
          pragraph={t(
            "Messages_sent_to_you_by_your_customers_through_your_website"
          )}
          dataLength={data?.length}
          addBtnValue={t("show_all")}
          addFunc={() => nav("/messages")}
        />
        <div className='data'>
          <CustomTable
            tableData={data}
            tableHeaders={tableHeaders}
            tableKeys={tableKeys}
          >
            {data?.map((item, index) => {
              return (
                <tr>
                  <td
                    style={{display: "flex", alignItems: "center", gap: "5px"}}
                  >
                    <div className='icon'>
                      <User width='30px' color='black' />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p style={{textDecoration: "underline"}}>{item.email}</p>
                    </div>
                  </td>
                  <td>
                    <button
                      style={{
                        padding: "5px",
                        backgroundColor: "var(--fifth-color)",
                        color: "var(--primary-color)",
                      }}
                    >
                      {item.order_status}
                    </button>
                  </td>
                  <td>
                    <div
                      className='icon'
                      onClick={() => {
                        setRowData(item);
                        setIsShowProductInfo(true);
                      }}
                    >
                      <Eye width='30px' color='balck' />
                    </div>
                  </td>
                </tr>
              );
            })}
          </CustomTable>

          {/* show product info modal */}
          <Modal
            isOpen={isShowProductInfo}
            onClose={() => {
              setIsShowProductInfo(false);
            }}
            modalTitle='order details'
          >
            <div className='client-details'>
              <div>
                <h3>client:</h3>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div
                    style={{display: "flex", alignItems: "center", gap: "10px"}}
                  >
                    <div className='icon'>
                      <User width='25px' color='rgb(202, 184, 184)' />
                    </div>
                    <h4>{rowData?.name}</h4>
                  </div>
                  <div className='links'>
                    <div className='icon'>
                      <a href='/#'>
                        <Mail color='black' width='20px' />
                      </a>
                    </div>
                    <div className='icon'>
                      <a href='/#'>
                        <Call color='black' width='20px' />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3>recieve date</h3>
                <p>{rowData?.created_at}</p>
              </div>
              <div>
                <h3>product</h3>
                <p>{rowData?.product.title[lang]}</p>
              </div>
              <div>
                <h3>client notes</h3>
                <p>{rowData?.message || "no"}</p>
              </div>
              <div>
                <h3>
                  order status:
                  <button
                    style={{
                      padding: "5px",
                      backgroundColor: "var(--fifth-color)",
                      color: "var(--primary-color)",
                    }}
                  >
                    {rowData?.order_status}
                  </button>
                </h3>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default LastMessage;
