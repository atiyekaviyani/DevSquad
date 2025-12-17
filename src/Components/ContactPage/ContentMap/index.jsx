import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const SARI_FARHANG_POSITION = {
  lat: 36.5633,
  lng: 53.0601,
};

function ChangeView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 2 });
  }, [center, zoom, map]);

  return null;
}

export default function ContactMap() {
  const [position, setPosition] = useState(SARI_FARHANG_POSITION);
  const [address, setAddress] = useState("");

  const geocodeAddress = (addr) => {
    if (addr.trim() === "") return null;
    const lower = addr.toLowerCase();
    if (
      lower.includes("مازندران") &&
      lower.includes("ساری") &&
      lower.includes("فرهنگ")
    ) {
      return SARI_FARHANG_POSITION;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coords = geocodeAddress(address);
    if (coords) {
      setPosition(coords);
    } else {
      alert("آدرس پیدا نشد، لطفا دوباره وارد کنید");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-10">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="آدرس را وارد کنید"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded p-2 flex-grow text-end"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          جستجو
        </button>
      </form>

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        <ChangeView center={position} zoom={15} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>مازندران، ساری، خیابان فرهنگ</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
