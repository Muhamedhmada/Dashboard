// import { Modal } from "antd";
import Modal from "../../CustomComponents/Modal/Modal";
import {useEffect, useState} from "react";
import {Eye, EyeSlash} from "../../Assets/SVGS";
import "./Users.css";
import {base_url} from "../../Assets/Base_Url";
import axios from "axios";
import CustomTable from "../../CustomComponents/Table/Table";
import {toast, ToastContainer} from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Header from "../../CustomComponents/Header/Header";
import { useTranslation } from "react-i18next";
function Users() {
  const {t}= useTranslation()
  const [pass, showPass] = useState(false);
  // table data 
  const tableHeaders = ["name", "email", "role", "created_date", "status", "tools"];
  const tableKeys = ["username", "email", "role", "created_at" , "status"];
  const token = localStorage.getItem("token")  //token
  // to open and close modal
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // to set the data
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(false)
  const [searchValue , setSearchValue] = useState("")
  // row data
  const [rowData , setRowData] = useState()
  // requested data
  const [checked , setChecked] = useState(true)
  const [userData , setUserData] = useState({
    username:"",
    email:"",
    role:"",
    password:"",
    // active:checked
  })


  
  // function to get data
  const getData = () => {
    axios
      .get(`${base_url}admin/list?keywords=2`,{
        headers:{
          "Authorization": `Bearer ${token}`,
        }
      })
      .then((res) => setData(res.data))
      .catch(error=>{
        console.log(error)
      });
  };

  // function to handle uploading the image

  // function to add a new item
  const handleAddItem = () => {

    
    console.log(token)
    console.log(userData)
    if(userData.username === "" || userData.email === "" || userData.password === "" || userData.role === ""){
      toast.warning("enter all fields please!")
      return
    }
    if(userData.password.length < 8){
      toast.warning("Password should have at least 8 characters")
      return
    }
    setLoading(true)
    axios.post(`${base_url}admin/create` , userData , {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(res=>{
      toast(res.data.message)
      getData()
    })
    .catch(error=>{
      toast.error(error.response.data.errors.message)
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

  const requestedEditData ={
    admin_id:rowData?.admin_id,
    is_active:rowData?.is_active,
  }
  const handleEdit = ()=>{
    console.log("aceepted")
    console.log(checked)
    console.log(rowData)
    setLoading(true)
    axios.put(`${base_url}admin/update`,requestedEditData,{
      headers:{
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      }
    }).then(res=>{
      toast.success(res.data.message)
      console.log(res.data.message)
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
      .delete(`${base_url}admin/delete`,{
        data:{
          product_id:rowData.admin_id
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
    setUserData(prev=>({username:"" , email:"" , role:""}))
    setChecked(true)
    setIsOpen(false)
  }
  // function to cancel edit modal 
  const handleCancelEditModal =()=>{
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='banner-container users'>
      <ToastContainer />
      <Header
        header={t('users')}
        dataLength={data?.data?.rows?.length}
        pragraph={t("manage_your_customers_orders")}
        searchFunc={(e)=>setSearchValue(e)}
        addBtnValue="Add New User"
        addFunc={()=>setIsOpen(true)}
      />
      {/* add modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleCancel();
        }}
        modalTitle='Create a new user'
      >
        <div className='inputs'>
          <div className='inputName'>
            <div className='specialInput'>
              <label htmlFor=''>username</label>
              <input
                value={userData.username}
                onChange={(e) =>
                  setUserData((prev) => ({...prev, username: e.target.value}))
                }
                type='text'
                placeholder='Username*'
              />
            </div>

            <div className='specialInput'>
              <label>email</label>
              <input
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({...prev, email: e.target.value}))
                }
                type='text'
                placeholder='Email*'
              />
            </div>
            <div className='specialInput'>
              <label htmlFor=''>role</label>
              <select
                name=''
                id=''
                value={userData.role}
                onChange={(e) =>
                  setUserData((prev) => ({...prev, role: e.target.value}))
                }
              >
                <option value='admin'>admin</option>
                <option value='editor'>editor</option>
                <option value='sales_manager'>sales_manager</option>
              </select>
            </div>
            <div className="specialInput passInput">
              <label htmlFor="">Password</label>
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({...prev, password: e.target.value}))
              }
              type='text'
              placeholder='Password*'
            />
            <div className="icon" onClick={() => showPass(prev=>!prev)}>
              {pass ? <Eye color="black" width="20px"/> : <EyeSlash color="black" width="20px"/>}
            </div>
            </div>
          </div>
        </div>
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
              {checked ? "Active" : "Not Active"}
            </p>
          </div>
          <div className='btns'>
            <button onClick={handleCancel}>Discard</button>
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
                "Add"
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
        modalTitle='Edit a user'
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
            <div className='specialInput'>
              <label htmlFor=''>username</label>
              <input
                value={rowData?.username}
                onChange={(e) =>
                  setRowData((prev) => ({...prev, username: e.target.value}))
                }
                type='text'
                placeholder='Username*'
              />
            </div>
            <div className='specialInput'>
              <label htmlFor=''>email</label>
              <input
                value={rowData?.email}
                onChange={(e) =>
                  setRowData((prev) => ({...prev, email: e.target.value}))
                }
                type='text'
                placeholder='Email*'
              />
            </div>
            <div className='specialInput'>
              <label htmlFor=''>role</label>
              <select name='' id=''
              placeholder="choose"
              value={rowData?.role}
              onChange={(e) =>
                setRowData((prev) => ({...prev, role: e.target.value}))
              }
              >
                <option value='sales_manager'>sales_manager</option>
                <option value='admin'>admin</option>
                <option value='editor'>editor</option>
              </select>
            </div>

            {/* <input
              value={rowData.password}
              onChange={(e) =>
                setRowData((prev) => ({...prev, password: e.target.value}))
              }
              type='text'
              placeholder='Password*'
            /> */}
          </div>
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
        modalTitle='Delete a user'
        // AcceptBtn={"Delete"}
        // CancelBtn={"DISCARD"}
        // handleAdd={handleDelete}
        // handleCancel={()=>setIsDeleteModalOpen(false)}
        // showModalsBtns={false}
        // checked={checked}
        // setChecked={setChecked}
      >
        <h2>are you sure to delete this user?</h2>

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
        tableData={data?.data?.rows}
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
export default Users;
