import Modal from "../../CustomComponents/Modal/Modal";
import {useEffect, useState} from "react";
// import {Search} from "../../Assets/SVGS";
import {base_url} from "../../Assets/Base_Url";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from "axios";
import Header from '../../CustomComponents/Header/Header'
import CustomTable from "../../CustomComponents/Table/Table";
import {toast, ToastContainer} from "react-toastify";
import { useTranslation } from "react-i18next";
function ProductsCategories() {
  const {t} = useTranslation()
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rowData , setRowData] = useState()
  const [searchValue , setSearchValue] = useState("")
  const [checked , setChecked] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [title , setTitle] = useState({
    en:"",
    ar:"",
    de:""
  })
  const [description , setDiscription] = useState({
    en:"",
    ar:"",
    de:""
  })

  const getData = () => {
    setLoading(true)
    axios
      .get(`${base_url}category/list?page=1&per_page=7&keywords=Feed`)
      .then((res) => setData(res.data))
      .catch(error=>{
        console.log(error)
      }).finally((res)=>{
        setLoading(false)
      });
  };

  console.log(data);



  const requestedData = {
    is_active: checked,
    title: {
      en: title.en,
      ar: title.ar,
      de: title.de
    },
    description: {
      en: description.en,
      ar: description.ar,
      de: description.de
    }
  }

  const handleAddProduct = ()=>{
    console.log("add a product")

    console.log(localStorage.getItem("token"))

    console.log(requestedData)
    if (
      requestedData.title.en === "" ||
      requestedData.title.de === "" ||
      requestedData.title.ar === ""
    ) {
      toast.error("Enter All Title Fields First");
      return;
    }
    if (
      requestedData.description.en === "" ||
      requestedData.description.de === "" ||
      requestedData.description.ar === ""
    ) {
      toast.error("Enter All Description Fields First");
      return;
    }

    axios.post(`${base_url}category/create` , requestedData,{
    headers: {
      "Authorization": `Bearer ${token}`, // Add token in Authorization header
    }
  })
    .then(res=>{
      toast(res.data.message)
      handleCancel()
    }).catch(error=>{
      toast.error("there is an error")
      console.log(error)
    }).finally(res=>{
      setIsOpen(false)
    })
  }

   // function to open edit modal
   const handleOpenEditModal=(row)=>{
    console.log("work")
    setIsEditModalOpen(true)
    console.log("function started")
    setRowData(row)
  }

  // function to edit the target item

  const requestedEditData = {
    category_id: rowData?.category_id,
    is_active: rowData?.is_active,
    title: {
      en: rowData?.title.en,
      ar: rowData?.title.ar,
      de: rowData?.title.de,
    },
    description: {
      en: rowData?.description.en,
      ar: rowData?.description.en,
      de: rowData?.description.en,
    },
  };
  const handleEdit = ()=>{
    if (
      rowData.title.en === "" ||
      rowData.title.ar === "" ||
      rowData.title.ar === ""
    ) {
      toast.error(t("nameRequiredCateg"));
      return;
    }
    if (
      rowData.description.en === "" ||
      rowData.description.ar === "" ||
      rowData.description.ar === ""
    ) {
      toast.error(t("descRequiredCateg"));
      return;
    }
    setLoading(true)
    axios.put(`${base_url}category/update`,requestedEditData,{
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    }).then(res=>{
      toast.success(res.data.message)
      setTimeout(() => {
        getData()
      }, 500);
    }).catch((error)=>{
      console.log(error)
    }).finally(res=>{
      setIsEditModalOpen(false)
      setLoading(false)
    })
  }


  const handleDelete = (index) => {
    console.log(index);
    setLoading(true);
    axios
      .delete(`${base_url}product/delete`, {
        category_id: index,
      })
      .then((res) => {
        toast.success("product deleted successfully")
        console.log(res);
        getData();
      })
      .catch((error) => {
        toast.error("failed to delete");
        console.log(error);
      })
      .finally((res) => setLoading(false));
  };

  // function to open delete modal
  const handleOpenDeleteModal = (row)=>{
    setRowData(row)
    setIsDeleteModalOpen(true)
  }

  // function to cancel edit modal 
  const handleCancelEditModal =()=>{
    setIsEditModalOpen(false)
  }
  const handleCancel = ()=>{
    setTitle(prev=>({en:"" , ar:"" , de:""}))
    setDiscription(prev=>({en:"" , ar:"" , de:""}))
    setChecked(true)
    setIsOpen(false)
  }


  useEffect(() => {
    setTimeout(()=>{

      getData();
    },500)
  }, []);
  const tableHeaders = ["name", "created_date", "status", "tools"];
  const tableKeys = ["title", "created_at", "is_active"];

  return (
    <div className='banner-container'>
      <ToastContainer />
      <Header
        header={t("product_categories")}
        dataLength={data?.data?.categories.length}
        pragraph={t("manage_product_categories")}
        addFunc={() => setIsOpen(true)}
        addBtnValue={t("create_new_category")}
        searchFunc={(e) => setSearchValue(e)}
      />
      {/* add modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleCancel();
        }}
        modalTitle={t("create_new_category")}
        AcceptBtn={t("add")}
        CancelBtn={t("cancel")}
        handleAdd={handleAddProduct}
        handleCancel={handleCancel}
        showModalsBtns={true}
        checked={checked}
        setChecked={setChecked}
      >
        <div
          className='inputs'
          style={{width: "100%", display: "flex", flexDirection: "column"}}
        >
          <input
            value={title.en}
            onChange={(e) =>
              setTitle((prev) => ({...prev, en: e.target.value}))
            }
            type='text'
            placeholder={t("name en") + "*"}
          />
          <input
            value={title.ar}
            onChange={(e) =>
              setTitle((prev) => ({...prev, ar: e.target.value}))
            }
            type='text'
            placeholder={t("name ar") + "*"}
          />
          <input
            value={title.de}
            onChange={(e) =>
              setTitle((prev) => ({...prev, de: e.target.value}))
            }
            type='text'
            placeholder={t("name de") + "*"}
          />
          <textarea
            value={description.en}
            onChange={(e) =>
              setDiscription((prev) => ({...prev, en: e.target.value}))
            }
            placeholder={t("desc en") + "*"}
          ></textarea>
          <textarea
            value={description.ar}
            onChange={(e) =>
              setDiscription((prev) => ({...prev, ar: e.target.value}))
            }
            placeholder={t("desc ar") + "*"}
          ></textarea>
          <textarea
            value={description.de}
            onChange={(e) =>
              setDiscription((prev) => ({...prev, de: e.target.value}))
            }
            placeholder={t("desc de") + "*"}
          ></textarea>
        </div>
      </Modal>

      {/* edit modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          handleCancelEditModal();
        }}
        modalTitle={t("edit category")}
        AcceptBtn={"SAVE"}
        CancelBtn={"DISCARD"}
        handleAdd={handleEdit}
        handleCancel={handleCancelEditModal}
        showModalsBtns={false}
        checked={checked}
        setChecked={setChecked}
      >
        <div
          className='inputs'
          style={{width: "100%", display: "flex", flexDirection: "column"}}
        >
          <input
            value={rowData?.title.en}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                title: {
                  ...prev.title,
                  en: e.target.value,
                },
              }))
            }
            type='text'
            placeholder={t("name en") + "*"}
          />
          <input
            value={rowData?.title.ar}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                title: {
                  ...prev.title,
                  ar: e.target.value,
                },
              }))
            }
            type='text'
            placeholder={t("name ar") + "*"}
          />
          <input
            value={rowData?.title.de}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                title: {
                  ...prev.title,
                  de: e.target.value,
                },
              }))
            }
            type='text'
            placeholder={t("name de") + "*"}
          />
          <textarea
            value={rowData?.description.en}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                description: {
                  ...prev.description,
                  en: e.target.value,
                },
              }))
            }
            placeholder={t("desc en") + "*"}
          ></textarea>
          <textarea
            value={rowData?.description.ar}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                description: {
                  ...prev.description,
                  ar: e.target.value,
                },
              }))
            }
            placeholder={t("desc ar") + "*"}
          ></textarea>
          <textarea
            value={rowData?.description.de}
            onChange={(e) =>
              setRowData((prev) => ({
                ...prev,
                description: {
                  ...prev.description,
                  de: e.target.value,
                },
              }))
            }
            placeholder={t("desc de") + "*"}
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
              {checked ? t("active") : t("un_active")}
            </p>
          </div>
          <div className='btns'>
            <button onClick={handleCancelEditModal}>{t("cancel")}</button>
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
        modalTitle={t("delete category")}
      >
        <h2>{t("delete_confirm")}</h2>
        {/* modals btn */}
        <div className='modalBtns'>
          <div className='btns'>
            <button onClick={() => setIsDeleteModalOpen(false)}>
              {t("no")}
            </button>
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
                t("yes")
              )}
            </button>
          </div>
        </div>
      </Modal>
      <CustomTable
        tableData={data?.data?.categories}
        tableHeaders={tableHeaders}
        tableKeys={tableKeys}
        handleDelete={handleDelete}
        loading={loading}
        searchValue={searchValue}
        handleEditBtn={handleOpenEditModal}
        handleDeleteBtn={handleOpenDeleteModal}
      ></CustomTable>
    </div>
  );
}
export default ProductsCategories;
