import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function MapComponent({ onLocationSelect }) {
  const [position, setPosition] = useState([-6.2088, 106.8456]); // Default to Jakarta, Indonesia

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-64 w-full rounded-lg"
      whenCreated={(map) => {
        map.on("click", (e) => {
          setPosition([e.latlng.lat, e.latlng.lng]);
          if (onLocationSelect) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
          }
        });
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Drag the marker or click the map to select your location.</Popup>
      </Marker>
    </MapContainer>
  );
}
