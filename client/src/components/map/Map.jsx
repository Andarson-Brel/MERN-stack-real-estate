import "./map.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

function Map({ items }) {
  if (!items || items.length === 0) {
    return null; // Or return some default message or component
  }

  // Find the first item with defined latitude and longitude
  const firstItemWithLatLng = items.find(
    (item) => item.latitude !== undefined && item.longitude !== undefined
  );

  // If no such item is found, return null or handle the case appropriately
  if (!firstItemWithLatLng) {
    return null; // Or return some default message or component
  }

  return (
    <MapContainer
      center={[firstItemWithLatLng.latitude, firstItemWithLatLng.longitude]}
      zoom={7}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items?.map((item) => (
        <Marker position={[item.latitude, item.longitude]} key={item.id}>
          <Popup>
            <div className="popupContainter">
              {item?.images && item.images.length > 0 && (
                <img src={item.images[0]} alt="" />
              )}
              <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span className="bed">{item.bedroom} Bedroom</span>
                <b>${item.price}</b>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
