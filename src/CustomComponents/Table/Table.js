import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Delete, Edit, Exit } from "../../Assets/SVGS";
import i18n from "../../LanguageTranslation/i18";
import "./Table.css";
const CustomTable = ({ tableData , tableHeaders , tableKeys , handleDeleteBtn  , loading , searchValue , handleEditBtn , children}) => {
  const lang = i18n.language
  const {t} = useTranslation()

  const [data  , setData] = useState(tableData || [])
  const [ filteredData , setFilteredData] = useState(tableData || [])
  const [tableLength , setTableLength] = useState(10)


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
      <table className='custom-table'>
        <thead>
          <tr>
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
                <tr>
                  {tableKeys?.map((key) => {
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
                        <Delete width='30px' color='rgb(13, 219, 13' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </motion.tbody>
        ) : <p>{t("no_data")}</p>}
      </table>
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