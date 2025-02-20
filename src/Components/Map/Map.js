import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Exit } from "../../Assets/SVGS";
const Map = ({ isOpen, onClose, lat, lng , modalTitle}) => {
  if (!isOpen) return null; // Hide the modal when it's closed
  return (
    <div className="modal-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="modal"
      >
        <div className="modalHeader">
          <button className="btnCloseModal"
            onClick={onClose}
          >
            <Exit width="25px" color="black"/>
          </button>
        </div>
        <p style={{fontWeight:"800" , lineHeight:"30px",marginBottom:"10px"}}>This map view is only for preview your entered location:</p>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{height: "400px", width: "100%"}}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <Marker position={[lat, lng]}>
            <Popup>
              Location: {lat}, {lng}
            </Popup>
          </Marker>
        </MapContainer>
      </motion.div>


    </div>
  );
};

export default Map;
