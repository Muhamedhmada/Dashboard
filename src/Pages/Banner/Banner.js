// import { Modal } from "antd";
import Modal from "../../CustomComponents/Modal/Modal";

import {useEffect, useRef, useState} from "react";
import { Upload} from "../../Assets/SVGS";
import "./Banner.css";
import {base_url} from "../../Assets/Base_Url";
import axios from "axios";
import CustomTable from "../../CustomComponents/Table/Table";
import {toast, ToastContainer} from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTranslation } from "react-i18next";
import  Header from "../../CustomComponents/Header/Header";
function Banner() {
  const {t} = useTranslation()
  // table data 
  const tableHeaders = [`${t("image")}`,`${t("name")}` , `${t("created_date")}`, `${t("status")}`, `${t("tools")}`];
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
  // row data
  const [rowData , setRowData] = useState()
  // requested data
  const [checked , setChecked] = useState(true)
  const [bannerTitle , setBannerTitle] = useState({
    en:"",
    ar:"",
    de:""
  })
  const [bannerLinkText , setBannerLinkText] = useState({
    en:"",
    ar:"",
    de:""
  })
  const [bannerDescription , setBannerDescription] = useState({
    en:"",
    ar:"",
    de:""
  })
  const [bannerLink , setBannerLink] = useState("")
  const [bannerTarget , setBannerTarget] = useState("")
  const [image , setImage] = useState(null)


  // function to handle uploading the image
  const handleImage = (e)=>{
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  // function to get data
  const getBanners = () => {
    setLoading(true)
    axios
      .get(`${base_url}banner/list?page=1&per_page=7`)
      .then((res) => setData(res.data))
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => setLoading(false));
  };

  // function to add a new item
  const handleAddItem = () => {
    if (
      bannerTitle.en === "" ||
      bannerTitle.ar === "" ||
      bannerTitle.de === ""
    ) {
      toast.error(t("nameRequired"));
      return;
    }
    if (
      bannerLinkText.en === "" ||
      bannerLinkText.ar === "" ||
      bannerLinkText.de === ""
    ) {
      toast.error(t("linkTextRequired"));
      return;
    }
    if (
      bannerDescription.en === "" ||
      bannerDescription.ar === "" ||
      bannerDescription.de === ""
    ) {
      toast.error(t("descRequired"));
      return;
    }
    const formData = new FormData()
    formData.append("banner_title[en]",bannerTitle.en)
    formData.append("banner_title[ar]",bannerTitle.ar)
    formData.append("banner_title[de]",bannerTitle.de)
    formData.append("banner_description[en]",bannerDescription.en)
    formData.append("banner_description[ar]",bannerDescription.ar)
    formData.append("banner_description[de]",bannerDescription.de)
    formData.append("banner_link_text[en]",bannerLinkText.en)
    formData.append("banner_link_text[ar]",bannerLinkText.ar)
    formData.append("banner_link_text[de]",bannerLinkText.de)
    formData.append("banner_link",bannerLink)
    formData.append("is_active",checked)
    formData.append("banner_target","test banner target item")
    formData.append("image",image)
    console.log(formData)
    // return
    setLoading(true)
    axios.post(`${base_url}banner/create` , formData , {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(res=>{
      toast(res.data.message)
      handleCancel()
    })
    .catch(error=>{
      toast.error("there is an error")
      console.log(error)
    }).finally(res=>{
      setIsOpen(false)
      setLoading(false)
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

  const requestedEditData ={
    banner_id:rowData?.banner_id,
    is_active:rowData?.is_active,
  }
  const handleEdit = ()=>{
    console.log("aceepted")
    setIsEditModalOpen(false)
    console.log(checked)
    console.log(rowData)
    axios.put(`${base_url}banner/update`,requestedEditData,{
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    }).then(res=>{
      toast(res.message)
    }).catch((error)=>{
      console.log(error)
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
      .delete(`${base_url}banner/delete`, {
        banner_id: rowData.banner_id,
      })
      .then((res) => {
        toast.success("product deleted successfully");
        console.log(res);
        getBanners();
      })
      .catch((error) => {
        toast.error("failed to delete");
        console.log(error);
      })
      .finally((res) => setLoading(false));
  };

  // function to cancel creation
  const handleCancel = ()=>{
    setBannerTitle(prev=>({en:"" , ar:"" , de:""}))
    setBannerDescription(prev=>({en:"" , ar:"" , de:""}))
    setBannerLinkText(prev=>({en:"" , ar:"" , de:""}))
    setBannerLink("")
    setBannerTarget("")
    setChecked(true)
    setIsOpen(false)
    setImage(null)
  }
  // function to cancel edit modal 
  const handleCancelEditModal =()=>{
    setIsEditModalOpen(false)
  }
  const removeSelectedImage =()=>{
    setImage(null)
  }

  useEffect(() => {
    getBanners();
  }, []);

  // const handleSearchValue = (e)=>{
  //   console.log(e)
  // }
  return (
    <div className='banner-container'>
      <ToastContainer />
      <Header
        header={t("home_banners")}
        dataLength={data?.data?.banners.length}
        pragraph={t("manage_your_home_page_slider_banners")}
        addFunc={() => setIsOpen(true)}
        addBtnValue={t("add_new_banner")}
        searchFunc={(e)=>setSearchValue(e)}
      />
      {/* add modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleCancel();
        }}
        modalTitle={t("create new banner")}
      >
        <div className='inputs'>
          <div className='inputName'>
            <label htmlFor='name'>{t("name")+"*"}</label>
            <input
              value={bannerTitle.en}
              onChange={(e) =>
                setBannerTitle((prev) => ({...prev, en: e.target.value}))
              }
              type='text'
              placeholder={t("name en")+"*"}
            />
            <input
              value={bannerTitle.ar}
              onChange={(e) =>
                setBannerTitle((prev) => ({...prev, ar: e.target.value}))
              }
              type='text'
              placeholder={t("name ar")+"*"}
            />
            <input
              value={bannerTitle.de}
              onChange={(e) =>
                setBannerTitle((prev) => ({...prev, de: e.target.value}))
              }
              type='text'
              placeholder={t("name de")+"*"}
            />
          </div>
          <div className='inputButton'>
            <label htmlFor='button'>Button Text*</label>
            <input
              value={bannerLinkText.en}
              onChange={(e) =>
                setBannerLinkText((prev) => ({...prev, en: e.target.value}))
              }
              type='text'
              placeholder='Button Text in(en)*'
            />
            <input
              value={bannerLinkText.ar}
              onChange={(e) =>
                setBannerLinkText((prev) => ({...prev, ar: e.target.value}))
              }
              type='text'
              placeholder='Button Text in(ar)*'
            />
            <input
              value={bannerLinkText.de}
              onChange={(e) =>
                setBannerLinkText((prev) => ({...prev, de: e.target.value}))
              }
              type='text'
              placeholder='Button Text in(de)*'
            />
          </div>
        </div>
        <div className='image-bannerLink'>
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
              <Upload width='50px' color='rgb(13, 219, 13)' />
              <h3 style={{textAlign:"center"}}>{t("image")}</h3>
            </div>
            <p
              style={{
                color: "rgb(13, 219, 13)",
                textTransform: "upperCase",
                fontSize: "larger",
              }}
            >
              {t("clickToUpload")}
            </p>
          </div>
          }
          <input
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
            type='text'
            placeholder='Link Button Will Open On Click'
          />
        </div>
        <textarea
          value={bannerDescription.en}
          onChange={(e) =>
            setBannerDescription((prev) => ({...prev, en: e.target.value}))
          }
          placeholder={t("desc en")+"*"}
        ></textarea>
        <textarea
          value={bannerDescription.ar}
          onChange={(e) =>
            setBannerDescription((prev) => ({...prev, ar: e.target.value}))
          }
          placeholder={t("desc ar")+"*"}
        ></textarea>
        <textarea
          value={bannerDescription.de}
          onChange={(e) =>
            setBannerDescription((prev) => ({...prev, de: e.target.value}))
          }
          placeholder={t("desc de")+"*"}
        ></textarea>
        <div className='modalBtns'>
          <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
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
            <p style={{fontSize: "20px", color: "rgb(43, 187, 43)"}}>
              {checked ? t("active") : t("un_active")}
            </p>
          </div>
          <div className='btns'>
            <button onClick={handleCancel}>{t("cancel")}</button>
            <button
              onClick={handleAddItem}
              disabled={loading}
              style={{color: "white"}}
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{fontSize: 24, color: "white"}}
                      spin
                    />
                  }
                  size='small'
                />
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
        modalTitle={t("edit_banner")}
        AcceptBtn={"SAVE"}
        CancelBtn={"DISCARD"}
        handleAdd={handleEdit}
        handleCancel={handleCancelEditModal}
        showModalsBtns={false}
        checked={checked}
        setChecked={setChecked}
      >
        <div className='inputs'>
          {/* <div className='inputName'>
            <label htmlFor='name'>name*</label>
            <input
              value={rowData?.title["en"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, title:{
                  ...prev.title,
                  "en":e.target.value
                }}))
              }
              type='text'
              placeholder='Name in(en)*'
            />
            <input
              value={rowData?.title["ar"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, title:{
                  ...prev.title,
                  "ar":e.target.value
                }}))
              }
              type='text'
              placeholder='Name in(ar)*'
            />
            <input
              value={rowData?.title["de"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, title:{
                  ...prev.title,
                  "de":e.target.value
                }}))
              }
              type='text'
              placeholder='Name in(de)*'
            />
          </div> */}
          {/* <div className='inputButton'>
            <label htmlFor='button'>Button Text*</label>
            <input
              value={rowData?.banner_link_text["en"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, banner_link_text:{
                  ...prev.banner_link_text,
                  "en":e.target.value
                }}))
              }
              type='text'
              placeholder='Button Text in(en)*'
            />
            <input
              value={rowData?.banner_link_text["ar"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, banner_link_text:{
                  ...prev.banner_link_text,
                  "ar":e.target.value
                }}))
              }
              type='text'
              placeholder='Button Text in(ar)*'
            />
            <input
              value={rowData?.banner_link_text["de"]}
              onChange={(e) =>
                setRowData((prev) => ({...prev, banner_link_text:{
                  ...prev.banner_link_text,
                  "de":e.target.value
                }}))
              }
              type='text'
              placeholder='Button Text in(de)*'
            />
          </div> */}
        </div>
        <div className='image-bannerLink'>
          {rowData?.image_url ? (
            <div className='image selectedImage'>
              <img
                src={rowData?.image_url}
                alt=''
              />
              <button>{t("remove")}</button>
            </div>
          ) : (
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
                <Upload width='50px' color='rgb(13, 219, 13)' />
                <h3 style={{textAlign:"center"}}>{t("image")}</h3>
              </div>
              <p
                style={{
                  color: "rgb(13, 219, 13)",
                  textTransform: "upperCase",
                  fontSize: "larger",
                }}
              >
                {t("clickToUpload")}
              </p>
            </div>
          )}

          <input
            value={rowData?.banner_link}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                banner_link: e.target.value,
              }))
            }
            type='text'
            placeholder='Link Button Will Open On Click'
          />
        </div>
        {/* <textarea
          value={rowData?.description["en"]}
          onChange={(e) =>
            setRowData((prev) => ({...prev, description:{
              ...prev.description,
              "en":e.target.value
            }}))
          }
          placeholder='Description In (en)'
        ></textarea>
        <textarea
          value={rowData?.description["ar"]}
          onChange={(e) =>
            setRowData((prev) => ({...prev, description:{
              ...prev.description,
              "ar":e.target.value
            }}))
          }
          placeholder='Description In (ar)'
        ></textarea>
        <textarea
          value={rowData?.description["de"]}
          onChange={(e) =>
            setRowData((prev) => ({...prev, description:{
              ...prev.description,
              "de":e.target.value
            }}))
          }
          placeholder='Description In (de)'
        ></textarea> */}

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
            <p style={{fontSize: "20px", color: "rgb(43, 187, 43)"}}>
              {checked ? "Active" : "Not Active"}
            </p>
          </div>
          <div className='btns'>
            <button onClick={handleCancelEditModal}>Discard</button>
            <button onClick={handleEdit}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{fontSize: 24, color: "white"}}
                      spin
                    />
                  }
                  size='small'
                />
              ) : (
                "Edit"
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
            <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
            <button onClick={handleDelete}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{fontSize: 24, color: "white"}}
                      spin
                    />
                  }
                  size='small'
                />
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* table that show the data */}
      <CustomTable
        tableData={data?.data?.banners}
        tableHeaders={tableHeaders}
        tableKeys={tableKeys}
        handleDelete={handleDelete}
        loading={loading}
        searchValue={searchValue}
        handleEditBtn={handleOpenEditModal}
        handleDeleteBtn={handleOpenDeleteModal}
      />
    </div>
  );
}
export default Banner;
