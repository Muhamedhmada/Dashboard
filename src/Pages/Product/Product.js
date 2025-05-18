import Modal from "../../CustomComponents/Modal/Modal";
import {useEffect, useRef, useState} from "react";
import { Upload} from "../../Assets/SVGS";
import "./Product.css";
import {base_url} from "../../Assets/Base_Url";
import axios from "axios";
import CustomTable from "../../CustomComponents/Table/Table";
import {toast, ToastContainer} from "react-toastify";
// import i18n from "../../LanguageTranslation/i18";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Header from "../../CustomComponents/Header/Header";
import { useTranslation } from "react-i18next";
function Banner() {
  // to get the lang
  // const lang = i18n.language
  const {t}= useTranslation()
  // table data 
  const tableHeaders = ["image", "name", "created_date", "status", "tools"];
  const tableKeys = ["image_url", "title", "created_at", "is_active"];
  const token = localStorage.getItem("token")  //token
  // to open and close modal
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // to set the data
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(false)
  const [searchValue , setSearchValue] = useState("")
  const ref = useRef()
  // rearrange btn
  const [isReArrange , setIsReArrange] = useState(false)
  // row data
  const [rowData , setRowData] = useState()
  // requested data
  const [checked , setChecked] = useState(true)
  const [title , setTitle] = useState({
    en:"",
    ar:"",
    de:""
  }) 
  const [description , setDescription] = useState({
    en:"",
    ar:"",
    de:""
  })
  const [image , setImage] = useState(null)



  // function to get data
  const getData = () => {
    setLoading(true)
    axios
      .get(`${base_url}product/list?page=1&per_page=90`)
      .then((res) => setData(res.data))
      .catch(error=>{
        console.log(error)
      }).finally((loading)=>{
        setLoading(false)
      })
  };

  // function to handle uploading the image
  const handleImage = (e)=>{
    setImage(e.target.files[0])
  }

  // function to add a new item
  const handleAddItem = () => {
    const formData = new FormData()
    formData.append("category_id" , 1)
    formData.append("is_active" , checked)
    formData.append("description[en]" , description.en)
    formData.append("description[de]" , description.de)
    formData.append("description[ar]" , description.ar)
    formData.append("title[en]",title.en)
    formData.append("title[ar]",title.ar)
    formData.append("title[de]",title.de)
    formData.append("image",image)

    console.log(...formData)

    if(description.en === "" ||
    description.ar === "" ||
    description.de === ""){
      toast.error(t("descRequiredProduct"))
      return
    }
    if(title.en === "" ||
    title.ar === "" ||
    title.de === ""){
      toast.error(t("nameRequiredProduct"))
      return
    }
    // return
    setLoading(true)
    axios.post(`${base_url}product/create` , formData , {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(res=>{
      toast.success(res.data.message)
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

  const handleEdit = ()=>{
    if (
      rowData?.title["en"] === "" ||
      rowData?.title["ar"] === "" ||
      rowData?.title["de"] === ""
    ) {
      toast.error(t("nameRequiredProduct"));
      return;
    }
    if (
      rowData?.description["en"] === "" ||
      rowData?.description["ar"] === "" ||
      rowData?.description["de"] === ""
    ) {
      toast.error(t("descRequiredProduct"));
      return;
    } 
    const formData = new FormData()
    formData.append("is_active",rowData?.is_active)   
    formData.append("title[en]",rowData?.title.en)   
    formData.append("title[de]",rowData?.title.de)   
    formData.append("title[ar]",rowData?.title.ar)   
    formData.append("description[en]",rowData?.description.en)   
    formData.append("description[de]",rowData?.description.de)   
    formData.append("description[ar]",rowData?.description.ar)   
    // formData.append("image_url",rowData?.image_url)   
    formData.append("product_id",rowData?.product_id)  
    setLoading(true)
    axios.put(`${base_url}product/update`,formData ,{
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    }).then(res=>{
      toast.success(res.data.message)
      getData()
    }).catch((error)=>{
      toast.error(t("error_message"))
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
      .delete(`${base_url}product/delete`,{
        data:{
          product_id:rowData.product_id
        },
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    })
      .then((res) => {
        toast.success("product deleted successfully");
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
    setTitle(prev=>({en:"" , ar:"" , de:""}))
    setDescription(prev=>({en:"" , ar:"" , de:""}))
    setImage(null)
    setChecked(true)
    setIsOpen(false)
  }
  // function to cancel edit modal 
  const handleCancelEditModal =()=>{
    setIsEditModalOpen(false)
  }

  const removeSelectedImage=()=>{
    setImage(null)
  }

  // save rearrange
  const saveReArrange = ()=>{
    console.log("save re arrange good")
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='banner-container'>
      <ToastContainer />
      <Header
        header={t('home_product')}
        dataLength={data?.data?.products?.length}
        pragraph={t("manage_your_customers_orders")}
        searchFunc={(e)=>setSearchValue(e)}
        addBtnValue={t("add_product")}
        addFunc={()=>setIsOpen(true)}
        showRearrange={true}
        reArrangeFunc={()=>setIsReArrange((prev)=>!prev)}
        reArrangeValue={isReArrange}
        saveReArrangeFunc={saveReArrange}
      />
      {/* add modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleCancel();
        }}
        modalTitle={t("create new product")}
      >
        <div className='inputs'>
          <div className='inputName'>
            <input
              value={title.en}
              onChange={(e) =>
                setTitle((prev) => ({...prev, en: e.target.value}))
              }
              type='text'
              placeholder={t("name en") +"*"}
            />
            <input
              value={title.ar}
              onChange={(e) =>
                setTitle((prev) => ({...prev, ar: e.target.value}))
              }
              type='text'
              placeholder={t("name ar") +"*"}
            />
            <input
              value={title.de}
              onChange={(e) =>
                setTitle((prev) => ({...prev, de: e.target.value}))
              }
              type='text'
              placeholder={t("name de") +"*"}
            />
          </div>
          {
            image?(
              <div className="image selectedImage">
                <img src={URL.createObjectURL(image)} alt="d"/>
                <button onClick={()=>removeSelectedImage()}>{t("remove")}</button>
              </div>
            ):
          <div
            className='image'
            onClick={() => {
              ref.current.click();
            }}

          >
            <input
              onChange={handleImage}
              ref={ref}
              type='file'
              style={{display: "none"}}
            />
            <div>
              <Upload width='50px' color='var(--primary-color)' />
              <h3 style={{color:"var(--primary-color)"}}>{t("image")}</h3>
            </div>
            <p
              style={{
                color: "var(--primary-color)",
                textTransform: "upperCase",
                fontSize: "larger",
              }}
            >
              {t("clickToUpload")}
            </p>
        </div>
          }
        </div>
        <textarea
          value={description.en}
          onChange={(e) =>
            setDescription((prev) => ({...prev, en: e.target.value}))
          }
          placeholder={t("desc en") +"*"}
        ></textarea>
        <textarea
          value={description.ar}
          onChange={(e) =>
            setDescription((prev) => ({...prev, ar: e.target.value}))
          }
          placeholder={t("desc ar") +"*"}
        ></textarea>
        <textarea
          value={description.de}
          onChange={(e) =>
            setDescription((prev) => ({...prev, de: e.target.value}))
          }
          placeholder={t("desc de") +"*"}
        ></textarea>
        <div className='modalBtns'>
          <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className='toggle-switch'>
              <input
                className='toggle-input'
                onClick={() => setChecked((prev) => !prev)}
                checked={checked}
                id='toggle'
                type='checkbox'
              />
              <label className='toggle-label' for='toggle'></label>
            </div>
            <p style={{fontSize: "20px", color: "var(--primary-color)"}}>
              {checked ? t("active") : t("un_active")}
            </p>
          </div>
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
        modalTitle={t("edit_product")}
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
            <div className="specialInput">
              <label htmlFor="name en">{t("name en")+`*`}</label>
              <input
                value={rowData?.title["en"]}
                onChange={(e) =>
                  setRowData((prev) => ({...prev, title:{
                    ...prev.title,
                    "en":e.target.value
                  }}))
                }
                type='text'
              />
            </div>
            <div className="specialInput">
              <label htmlFor="name ar">{t("name ar")+`*`}</label>
              <input
                value={rowData?.title["ar"]}
                onChange={(e) =>
                  setRowData((prev) => ({...prev, title:{
                    ...prev.title,
                    "ar":e.target.value
                  }}))
                }
                type='text'
              />
            </div>
            <div className="specialInput">
              <label htmlFor="name de">{t("name de")+`*`}</label>
              <input
                value={rowData?.title["de"]}
                onChange={(e) =>
                  setRowData((prev) => ({...prev, title:{
                    ...prev.title,
                    "de":e.target.value
                  }}))
                }
                type='text'
              />
            </div>
          </div>
          <div className='image-bannerLink'>
            {rowData?.image_url ? (
              <div className='image selectedImage'>
                <img
                  src={
                    rowData?.image_url instanceof File?
                    URL.createObjectURL(rowData?.image_url)
                    :
                    rowData?.image_url
                  }
                  style={{width: "200px", heigh: "200px"}}
                  alt=''
                />
                <button onClick={()=>setRowData((prev)=>({...prev,image_url:null}))}>{t("remove")}</button>
              </div>
            ) : (
              <div
                className='image'
                onClick={() => {
                  ref.current.click();
                }}
              >
                <input
                  onChange={(e)=>setRowData((prev)=>({...prev, image_url:e.target.files[0]}))}
                  ref={ref}
                  type='file'
                  style={{display: "none"}}
                />
                <div>
                  <Upload width='50px' color='rgb(13, 219, 13)' />
                  <h3>Image</h3>
                </div>
                <p
                  style={{
                    color: "rgb(13, 219, 13)",
                    textTransform: "upperCase",
                    fontSize: "larger",
                  }}
                >
                  click to upload
                </p>
              </div>
            )}

          </div>
        </div>
        <div className="specialInput">
          <label htmlFor="desc em">{t("desc en")+`*`}</label>
          <textarea
            value={rowData?.description["en"]}
            onChange={(e) =>
              setRowData((prev) => ({...prev, description:{
                ...prev.description,
                "en":e.target.value
              }}))
            }
          ></textarea>
        </div>
        <div className="specialInput">
          <label htmlFor="desc ar">{t("desc ar")+`*`}</label>
          <textarea
            value={rowData?.description["ar"]}
            onChange={(e) =>
              setRowData((prev) => ({...prev, description:{
                ...prev.description,
                "ar":e.target.value
              }}))
            }
          ></textarea>
        </div>
        <div className="specialInput">
          <label htmlFor="desc de">{t("desc de")+`*`}</label>
          <textarea
            value={rowData?.description["de"]}
            onChange={(e) =>
              setRowData((prev) => ({...prev, description:{
                ...prev.description,
                "de":e.target.value
              }}))
            }
          ></textarea>
        </div>

        {/* modals btn */}
        <div className='modalBtns'>
          <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
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
              {rowData?.is_active ? t("active") : t("un_active")}
            </p>
          </div>
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
      >
        <h2>{t("delete_confirm")}</h2>
        {/* modals btn */}
        <div className='modalBtns'>
          <div className='btns'>
            <button onClick={()=>setIsDeleteModalOpen(false)}>{t("no")}</button>
            <button onClick={handleDelete}>
            {loading ? (
                <Spin indicator={<LoadingOutlined  style={{ fontSize: 24,color:"white" }}  spin />} size="small" />
                ) : (
                t("yes")
              )}
              </button>
          </div>
        </div>
      </Modal>

      {/* table that show the data */}
      <CustomTable
        tableData={data?.data?.products}
        tableHeaders={tableHeaders}
        tableKeys={tableKeys}
        handleDelete={handleDelete}
        loading={loading}
        searchValue={searchValue}
        handleEditBtn={handleOpenEditModal}
        handleDeleteBtn = {handleOpenDeleteModal}
        reArrangeValue={isReArrange}
      />
    </div>
  );
}
export default Banner;
