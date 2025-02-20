import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RichText from '../../../../Components/RichText/RichText'
function Impressium({data}){
  const [isChecked , setIsChecked] = useState(data?.impressium_status)
  const handleChecked = ()=>{
    setIsChecked(!isChecked)
  }
  const handleSave = ()=>{
    console.log("save updated")
  }
  const pageContent = {
    en:"enterimpressiumContentEn",
    ar:"enterimpressiumContentAr",
    es:"enterimpressiumContentEs"
  }
  console.log(data)
  return (
    <div className='policy-container'>
      <RichText
        header='impressium page content'
        saveFunc={() => handleSave()}
        checked={data?.impressium_status}
        handleChecked={() => handleChecked()}
        pageActive={"pageActive"}
        pageUnActive={"pageUnActive"}
        pageContent={pageContent}
        data={data?.impressium}
      />
    </div>
  );
}
export default Impressium