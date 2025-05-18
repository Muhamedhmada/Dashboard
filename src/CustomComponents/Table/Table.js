import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Delete, Drag, Edit, Exit } from "../../Assets/SVGS";
import i18n from "../../LanguageTranslation/i18";
import "./Table.css";
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';


const CustomTable = ({ tableData , tableHeaders , tableKeys , handleDeleteBtn  , loading , searchValue , handleEditBtn , children , reArrangeValue}) => {
  const lang = i18n.language
  const {t} = useTranslation()

  const [data  , setData] = useState(tableData || [])
  const [ filteredData , setFilteredData] = useState(tableData || [])
  const [tableLength , setTableLength] = useState(10)

  // re arrange data 

  const ItemType="Row"

  const swap =(fromIndex , toIndex)=>{
    const updatedItems = [...data]
    console.log(updatedItems)
    const [movedItems] = updatedItems.splice(fromIndex , 1)
    console.log(movedItems)
    updatedItems.splice(toIndex,0,movedItems)
    console.log(updatedItems)
    setData(updatedItems)
    setFilteredData(updatedItems)
    console.log("dragged")
  }

  function Row({index ,children}){
    const [{isDragging},dragRef] = useDrag({
      type:ItemType,
      item:{index},
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })

    })
    const [,dropRef] = useDrop({
      accept:ItemType,
      drop:(draggedItem)=>swap(draggedItem.index , index)
    })
    return (
      <motion.tr
      ref={reArrangeValue ? (node) => dragRef(dropRef(node)) : null}

        className={isDragging?"isDragging":null}
        animate={{
          scale: isDragging ? 1.02 : 1,
          boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
          opacity: isDragging ? 0.5 : 1,
        }}
        transition={{duration: 0.2}}
      >
        {/* <AnimatePresence mode='wait'> */}
        {reArrangeValue ? (
          <motion.td
            // key={reArrangeValue ? "dragged" : "normal"}
            // initial={{left: "-200px"}}
            // animate={{left: reArrangeValue ? "0" : "-200px"}}
            // transition={{duration: 0.3}}
            className='draggedIcon'
            // ref={reArrangeValue ? (node) => dragRef(dropRef(node)) : null}
          >
            <Drag width='40px' color='black' />
          </motion.td>
        ) : null}
        {/* </AnimatePresence> */}

        {children}
      </motion.tr>
    );
  }


  // row data

  // const [rowData , setRowData] = useState()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Slice data to display only current page items
  const displayedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(()=>{
    setData(tableData)
    const filteredData =  data?.filter((item  , index) =>
      item?.title?.[lang].toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.username?.toLowerCase().includes(searchValue.toLowerCase())
    )
    if(filteredData){
      setFilteredData(filteredData)
    }else{
      setFilteredData(tableData)
    }
  },[searchValue , tableData , lang ])
  return (
    <div className='table-container'>
      <DndProvider backend={HTML5Backend}>
        <table className='custom-table'>
          <thead>
            <tr>
              {
                reArrangeValue?
                <th></th>
                :null
              }
              {tableHeaders?.map((item) => (
                  <th>{t(item)}</th>                
              ))}
            </tr>
          </thead>
          {displayedData?.length > 0 || React.Children.count(children) > 0 ? (
            <motion.tbody
              key={currentPage} // Ensures re-animation when page changes
              initial={{opacity: 0, x: 50}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -50}}
              transition={{duration: 0.5, ease: "easeInOut"}}
            >
              {loading ? (
                <p>{t("loading")}</p>
              ) : children ? (
                React.Children.toArray(children).slice(0, tableLength)
              ) : (
                displayedData?.map((item, index) => (
                  <Row index={index}>
                    {tableKeys?.map((key) => {
                      <td>ge</td>
                      if (key === "title") {
                        return <td key={key}>{item[key][lang] || "not"}</td>;
                      } else if (key === "image_url") {
                        return (
                          <td key={key}>
                            <img
                              src={item[key]}
                              alt='Imagee'
                              style={{width: "50px", height: "50px"}}
                            />
                          </td>
                        );
                      } else if (key === "created_at") {
                        return (
                          <td key={key}>
                            {new Date(item[key]).toLocaleString(`${lang}-EG`, {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </td>
                        );
                      } else if (key === "is_active" || key === "status") {
                        return (
                          <td key={key} className='status'>
                            {item[key] ? (
                              <button>
                                <Check width='30px' color='white' />
                              </button>
                            ) : (
                              <Exit />
                            )}
                          </td>
                        );
                      } else {
                        return <td key={key}>{item[key]}</td>;
                      }
                    })}
                    <td className='toolsBtn'>
                      <div className='btns'>
                        <button onClick={() => handleEditBtn(item)}>
                          <Edit width='30px' color='white' />
                        </button>
                        <button
                          disabled={loading}
                          onClick={() => handleDeleteBtn(item)}
                        >
                          <Delete width='30px' color='var(--primary-color)' />
                        </button>
                      </div>
                    </td>
                  </Row>
                ))
              )}
            </motion.tbody>
          ) : <p>{t("no_data")}</p>}
        </table>
      </DndProvider>
      {/* Pagination Controls */}
      <div className='pagination'>
        <select
          name=''
          id=''
          defaultValue={10}
          onChange={(e) => setTableLength(e.target.value)}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
        <div className='btns'>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ❮
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;