import { Pagination, Table } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LastMessage.css'
function LastMessage(){

  const {t}=useTranslation()


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const columns = [
    // {
    //   title: "Column 1",
    //   dataIndex: "col1",
    //   key: "col1",
    // },
    // {
    //   title: "Column 2",
    //   dataIndex: "col2",
    //   key: "col2",
    // },
  ];

  // Empty data source
  const data = [];
  return(
    <div className="lastMessage-container">
      <div className="lastMessage-content">
        <div className="header">
          <div className="info">
            <h2> {t("last_week_messages")}  </h2>
            <p>{t("Messages_sent_to_you_by_your_customers_through_your_website")}</p>
          </div>
          <button>{t("show_all")}</button>
        </div>
        <div className="data">

        {/* <Table
        columns={columns}
        dataSource={data}
        pagination={false} // Disable default pagination
        locale={{
          emptyText: "لا يوجد بيانات", // Custom "No Data" message
        }}
        bordered
        style={{ width: "100%", margin: "0 auto" }}
      /> */}
      {/* Custom Pagination */}
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        {data.length > 0 ? (
          <>
          <Table
          columns={columns}
          dataSource={data}
          pagination={false} // Disable default pagination
          locale={{
            emptyText: "لا يوجد بيانات", // Custom "No Data" message
          }}
          bordered
          style={{ width: "100%", margin: "0 auto" }}
          />
          <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            />
            </>
        ) : (
          <>
          {t("no_data")} 
          <Pagination
            current={1}
            total={0} // Show no pages when no data exists
            pageSize={pageSize}
            disabled
            showSizeChanger={false}
            />
            </>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}
export default LastMessage
