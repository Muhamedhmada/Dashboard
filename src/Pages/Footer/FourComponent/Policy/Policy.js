import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RichText from '../../../../Components/RichText/RichText'
import './Policy.css'
function Policy({data}){
  const [isChecked , setIsChecked] = useState(data?.privacy_policy_status)
  const handleChecked = ()=>{
    setIsChecked(!isChecked)
  }
  const handleSave = ()=>{
    console.log("save updated")
  }
  const pageContent = {
    en:"enterPrivacyContentEn",
    ar:"enterPrivacyContentAr",
    es:"enterPrivacyContentEs"
  }
  console.log(data)
  return (
    <div className='policy-container'>
      <RichText
        header='policy page content'
        saveFunc={() => handleSave()}
        checked={data?.privacy_policy_status}
        handleChecked={() => handleChecked()}
        pageActive={"pageActive"}
        pageUnActive={"pageUnActive"}
        pageContent={pageContent}
        data={data?.privacy_policy}
      />
    </div>
  );
}
export default Policy