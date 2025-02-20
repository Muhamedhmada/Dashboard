import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RichText from '../../../../Components/RichText/RichText'
import './Terms.css'
function Terms({data}){
  const [isChecked , setIsChecked] = useState(data?.terms_and_conditions_status)
  const handleChecked = ()=>{
    setIsChecked(!isChecked)
  }
  const handleSave = ()=>{
    console.log("save updated")
  }
  const pageContent = {
    en:"enterTermsContentEn",
    ar:"enterTermsContentAr",
    es:"enterTermsContentEs"
  }
  console.log(data)
  return (
    <div className='policy-container'>
      <RichText
        header='terms page content'
        saveFunc={() => handleSave()}
        checked={data?.terms_and_conditions_status}
        handleChecked={() => handleChecked()}
        pageActive={"pageActive"}
        pageUnActive={"pageUnActive"}
        pageContent={pageContent}
        data={data?.terms_and_conditions}
      />
    </div>
  );
}
export default Terms