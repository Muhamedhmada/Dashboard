import {useTranslation} from "react-i18next";
import LastMessage from "../../../Components/LastMessage/LastMessage";
import NewOrder from "../../../Components/NewOrder/NewOrder";
import ControlCard from "../ControlCard/ControlCard";
import "./HomeContent.css";
function HomeContent() {
  const {t} = useTranslation();
  return (
    <div className='home-content'>
      <h2>{t("control_panal")}</h2>
      <ControlCard />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <div style={{flex: 1, minWidth: "300px"}}>
          <NewOrder />
        </div>
        <div style={{flex: 1, minWidth: "300px"}}>
          <LastMessage />
        </div>
      </div>
    </div>
  );
}
export default HomeContent;
