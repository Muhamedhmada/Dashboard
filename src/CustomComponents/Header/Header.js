import { useTranslation } from 'react-i18next'
import { Search } from '../../Assets/SVGS'
import './Header.css'
function Header({header , pragraph , dataLength, addFunc , addBtnValue , searchFunc , showRearrange}){
  const {t} = useTranslation()
  return(
    <header className='customHeader'>
      <div className='header'>
        <h2 className=''>{header}({dataLength})</h2>
        <p>{pragraph}</p>
        {
          searchFunc?
        <div className='search'>
          <div className='icon'>
            <Search width='30px' color='rgb(202, 184, 184)' />
          </div>
          <input
            type='search'
            placeholder={t("search")}
            onChange={(e) => searchFunc(e.target.value)}
          />
        </div>
        :null
        }
      </div>
      <div className='btns'>
        {
          showRearrange?
          <button>{t("re_arrange")}</button>
          :null
        }
        {
          addFunc?
          <button style={{color:"white" , backgroundColor:"rgb(13, 219, 13)"}} onClick = {()=>addFunc()}>{addBtnValue}</button>
          :null
        }
      </div>
  </header>
  )
}
export default Header