import Modal from "../../../../CustomComponents/Modal/Modal";
import {useEffect, useState} from "react";
import { Delete, Edit} from "../../../../Assets/SVGS";
import "./Social.css";
import {base_url} from "../../../../Assets/Base_Url";
import axios from "axios";
import CustomTable from "../../../../CustomComponents/Table/Table";
import {toast, ToastContainer} from "react-toastify";
// import i18n from "../../LanguageTranslation/i18";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Header from "../../../../CustomComponents/Header/Header";
import { useTranslation } from "react-i18next";
function Banner() {
  // to get the lang
  // const lang = i18n.language
  const {t}= useTranslation()
  // table data 
  const tableHeaders = [`${t("icon")}`, `${t("social media links")}`, "tools"];
  const tableKeys = ["icon", "link"];
  const token = localStorage.getItem("token")  //token
  // to open and close modal
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // to set the data
  const [data, setData] = useState([]);
  const [filteredData , setFilteredData] = useState()
  const [originalData , setOriginalData] = useState()
  const [loading , setLoading] = useState(false)
  const [searchValue , setSearchValue] = useState("")
  // row data
  const [rowData , setRowData] = useState()
  // requested data
  const [checked , setChecked] = useState(true)
  const [newData , setNewData] = useState({
    link:"",
    icon:"",
  })

  
  // function to get data
  const getData = () => {
    setLoading(true)
    axios
      .get(`${base_url}social_media/list?page=1&per_page=7`)
      .then((res) => setData(res.data.data.socialMediaLinks))
      .catch(error=>{
        console.log(error)
      }).finally((res)=>setLoading(false))
  };

  // function to handle uploading the image

  // function to add a new item
  const handleAddItem = () => {

    // return
    setLoading(true)
    axios.post(`${base_url}social_media/create` , newData , {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(res=>{
      toast(res.data.message)
      getData()
    })
    .catch(error=>{
      toast.error("can't add the product")
      console.log(error)
    }).finally(res=>{
      setIsOpen(false)
      setLoading(false)
      handleCancel()
    })
  };

  // function to open edit modal
  const handleOpenEditModal=(row)=>{
    console.log("work")
    setIsEditModalOpen(true)
    console.log("function started")
    setRowData(row)
  }

  // function to edit the target item

  const updatedData ={
    social_media_id: rowData?.id,
    link: rowData?.link,
    icon: rowData?.icon
  }
  const handleEdit = ()=>{
    setLoading(true)
    axios.put(`${base_url}social_media/update`,updatedData,{
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    }).then(res=>{
      toast.success(res.data.message)
      console.log(res.data.message)
      getData()
    }).catch((error)=>{
      console.log(error)
    }).finally(res=>{
      setIsEditModalOpen(false)
      setLoading(false)
    })
  }


  // function to open delete modal
  const handleOpenDeleteModal = (row)=>{
    setRowData(row)
    setIsDeleteModalOpen(true)
  }
  // function to delete item
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`${base_url}social_media/delete`,{
        data:{
          social_media_id:rowData?.id
        },
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    })
      .then((res) => {
        toast.success("item deleted successfully");
        console.log(res);
        getData();
      })
      .catch((error) => {
        toast.error("failed to delete");
        console.log(error);
      })
      .finally((res) =>{
        setIsDeleteModalOpen(false)
         setLoading(false)
      });
  };

  // function to cancel creation
  const handleCancel = ()=>{
    setNewData(prev=>({icon:"" , link:""}))
    setChecked(true)
    setIsOpen(false)
  }
  // function to cancel edit modal 
  const handleCancelEditModal =()=>{
    setIsEditModalOpen(false)
  }

  console.log(rowData)

  useEffect(()=>{
    const filteredData = data?.filter((item)=>
      item.link.toLowerCase().includes(searchValue.toLowerCase())
    )
    if(filteredData){
      setFilteredData(filteredData)
    }else{
      setFilteredData(data)
    }
  },[data , searchValue])
  useEffect(() => {
    setOriginalData(data)
    getData();
  }, [ ]);

  return (
    <div className='banner-container'>
      <ToastContainer />
      <Header
        header={t('social media links')}
        dataLength={data?.length}
        pragraph={t("manage_your_customers_orders")}
        searchFunc={(e)=>setSearchValue(e)}
        addBtnValue={t("add social media link")}
        addFunc={()=>setIsOpen(true)}
      />
      {/* add modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleCancel();
        }}
        modalTitle={t("create social link")}
      >
        <div className='inputs'>
          <div className='inputName'>
            <input
              value={newData.icon}
              onChange={(e) =>
                setNewData((prev) => ({...prev, icon: e.target.value}))
              }
              type='text'
              placeholder={t("icon")}
            />
            <input
              value={newData.link}
              onChange={(e) =>
                setNewData((prev) => ({...prev, link: e.target.value}))
              }
              type='text'
              placeholder={t("link")}
            />
          </div>
        </div>
        <div className='modalBtns'>
          <div className='btns'>
            <button onClick={handleCancel}>{t("cancel")}</button>
            <button onClick={handleAddItem} disabled={loading} style={{color:"white"}}>
              {loading ? (
                <Spin indicator={<LoadingOutlined  style={{ fontSize: 24,color:"white" }}  spin />} size="small" />
              ) : (
                t("add")
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* edit modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          handleCancelEditModal();
        }}
        modalTitle={t("edit the links")}
        AcceptBtn={"SAVE"}
        CancelBtn={"DISCARD"}
        handleAdd={handleEdit}
        handleCancel={handleCancelEditModal}
        showModalsBtns={false}
        checked={checked}
        setChecked={setChecked}
      >
        
        <div className='inputs'>
          <div className='inputName'>
            <input
              value={rowData?.icon}
              onChange={(e) =>
                setRowData((prev) => ({...prev, icon: e.target.value}))
              }
              type='text'
              placeholder={t("icon")}
            />
            <input
              value={rowData?.link}
              onChange={(e) =>
                setRowData((prev) => ({...prev, link: e.target.value}))
              }
              type='text'
              placeholder={t("link")}
            />
          </div>
        </div>
        {/* modals btn */}
        <div className='modalBtns'>
          {/* <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className='toggle-switch'>
              <input
                className='toggle-input'
                onClick={() =>
                  setRowData((prev) => ({...prev, is_active: !prev.is_active}))
                }
                checked={rowData?.is_active}
                id='toggle'
                type='checkbox'
              />
              <label className='toggle-label' for='toggle'></label>
            </div>
            <p style={{fontSize: "20px", color: "var(--primary-color)"}}>
              {checked ? "Active" : "Not Active"}
            </p>
          </div> */}
          <div className='btns'>
            <button onClick={handleCancelEditModal}>{t("cancel")}</button>
            <button onClick={handleEdit}>
            {loading ? (
                <Spin indicator={<LoadingOutlined  style={{ fontSize: 24,color:"white" }}  spin />} size="small" />
                ) : (
                t("edit")
              )}
              </button>
          </div>
        </div>
      </Modal>

      {/* delete modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          handleCancelEditModal();
        }}
        modalTitle='Delete a banner'
        // AcceptBtn={"Delete"}
        // CancelBtn={"DISCARD"}
        // handleAdd={handleDelete}
        // handleCancel={()=>setIsDeleteModalOpen(false)}
        // showModalsBtns={false}
        // checked={checked}
        // setChecked={setChecked}
      >


        <h2>are you sure to delete this item?</h2>


        {/* modals btn */}
        <div className='modalBtns'>
          <div className='btns'>
            <button onClick={()=>setIsDeleteModalOpen(false)}>No</button>
            <button onClick={handleDelete}>
            {loading ? (
                <Spin indicator={<LoadingOutlined  style={{ fontSize: 24,color:"white" }}  spin />} size="small" />
                ) : (
                "Yes"
              )}
              </button>
          </div>
        </div>
      </Modal>

      {/* table that show the data */}
      <CustomTable
        tableHeaders={tableHeaders}
        tableKeys={tableKeys}
        loading={loading}
      >
        {filteredData?.map((item, index) => {
          return (
            <tr>
              <td>
              
                <i className={`mdi ${item.icon}`} style={{ fontSize: "24px", color: "blue" }}></i>
                </td>
              <td><a style={{textTransform:"none"}} href={item.link}>{item.link}</a></td>
              <td className='toolsBtn'>
                      <div className='btns'>
                        <button
                         onClick={() => handleOpenEditModal(item)}
                         >
                          <Edit width='30px' color='white' />
                        </button>
                        <button
                          // disabled={loading}
                          onClick={() => handleOpenDeleteModal(item)}
                        >
                          <Delete width='30px' color='var(--primary-color)' />
                        </button>
                      </div>
                    </td>
            </tr>
          );
        })}
      </CustomTable>


    </div>
  );
}
export default Banner;
