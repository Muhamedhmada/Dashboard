// import { Modal } from "antd";
import Modal from "../../CustomComponents/Modal/Modal";
import {useEffect, useState} from "react";
import {Call, Eye, Mail, User} from "../../Assets/SVGS";
import "./Messages.css";
import {base_url} from "../../Assets/Base_Url";
import axios from "axios";
import CustomTable from "../../CustomComponents/Table/Table";
import {ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import i18n from "../../LanguageTranslation/i18";
import Header from "../../CustomComponents/Header/Header";
function Messages() {
  // get token
  const token = localStorage.getItem("token"); //token
  // to get the lang
  const {t} = useTranslation();
  const lang = i18n.language;
  // table data
  const tableHeaders = [
    `${t("name")}`,
    `${t("phone")}`,
    `${t("created_date")}`,
    `${t("tools")}`,
  ];
  const tableKeys = ["name", "phone", "created_at"];
  // to open and close modal
  const [isShowProductInfo, setIsShowProductInfo] = useState(false);
  // to set the data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [originalData, setOriginalData] = useState();
  // loading
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // row data
  const [rowData, setRowData] = useState();

  // function to get data
  const getData = () => {
    setLoading(true);
    axios
      .get(`${base_url}order/list?page=1&per_page=12`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data.orders);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        setLoading(false);
      });
  };

  // function to search using name
  useEffect(() => {
    if (searchValue !== "") {
      const filteredData = data?.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredData.length > 0 ? filteredData : originalData);
    } else {
      setFilteredData(data);
    }
  }, [data, searchValue]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setOriginalData(data);
    }
    getData();
  }, []);

  return (
    <div className='banner-container orders'>
      <ToastContainer />
      <Header
        header={t("messages")}
        dataLength={data?.length}
        pragraph={t(
          "Messages_sent_to_you_by_your_customers_through_your_website"
        )}
        showSearch={true}
        searchFunc={(e) => setSearchValue(e)}
      />

      {/* show product info modal */}
      <Modal
        isOpen={isShowProductInfo}
        onClose={() => {
          setIsShowProductInfo(false);
        }}
        modalTitle={t("order_details")}
      >
        <div className='client-details'>
          <div>
            <h3>{t("client")}:</h3>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <div className='icon'>
                  <User width='25px' color='rgb(202, 184, 184)' />
                </div>
                <h4>{rowData?.name}</h4>
              </div>
              <div className='links'>
                <div className='icon'>
                  <a href={`mailto:${rowData?.email}`}>
                    <Mail color='black' width='20px' />
                  </a>
                </div>
                <div className='icon'>
                  <a href={`tel:${rowData?.phone}`}>
                    <Call color='black' width='20px' />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>{t("created_date")}</h3>
            <p>
              {new Date(rowData?.created_at).toLocaleString(`${lang}-EG`, {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          <div>
            <h3>{t("product")}</h3>
            <p>{rowData?.product.title[lang]}</p>
          </div>
          <div>
            <h3>{t("client_notes")}</h3>
            <p>{rowData?.message || "no"}</p>
          </div>
          <div>
            <h3>
              {t("order_status")}:
              <button
                style={{
                  padding: "5px",
                  backgroundColor: "#eee",
                  color: "rgb(13, 219, 13)",
                }}
              >
                {rowData?.order_status}
              </button>
            </h3>
          </div>
        </div>
      </Modal>

      {/* modal to accept order or cancel it */}
      {/* <Modal
        isOpen={isShowProductInfo}
        onClose={() => {
          setIsShowProductInfo(false);
          handleCancelEditModal();
        }}
        modalTitle='are you sure'
      >
        <h4>you are going to set this order as completed, you can't </h4>
      </Modal> */}

      {/* table that show the data */}
      <CustomTable
        tableHeaders={tableHeaders}
        tableKeys={tableKeys}
        loading={loading}
      >
        {loading ? (
          <p>{t("loading")}</p>
        ) : (
          filteredData?.map((item, index) => {
            return (
              <tr>
                <td
                  style={{display: "flex", alignItems: "center", gap: "10px"}}
                >
                  <div className='icon'>
                    <User width='30px' color='rgb(202, 184, 184)' />
                  </div>
                  <div>
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                  </div>
                </td>
                <td>{item.phone}</td>
                <td>
                  {new Date(item.created_at).toLocaleString(`${lang}-EG`, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>
                  <div
                    className='eye-icon'
                    onClick={() => {
                      setRowData(item);
                      setIsShowProductInfo(true);
                    }}
                    style={{borderRadius: "0"}}
                  >
                    <Eye width='30px' color='balck' />
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </CustomTable>
    </div>
  );
}
export default Messages;
