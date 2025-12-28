import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [28, 45],
  iconAnchor: [14, 45],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [45, 45],
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
    <motion.div
      className="w-full max-w-5xl mx-auto p-6 mt-12 font-yekan select-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* فرم جستجو */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 items-center"
        dir="rtl"
      >
        <input
          type="text"
          placeholder="آدرس را وارد کنید"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="
            flex-grow
            text-right
            text-gray-900
            placeholder-gray-400

            border
            border-gray-300
            rounded-lg
            px-5
            py-3
            focus:outline-none
            transition
            duration-300
            font-normal
            
          "
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="submit"
          className="
            bg-gray-900
            text-white
            px-7
            py-3
            rounded-lg
            font-semibold
            tracking-wide
            hover:bg-gray-800
            active:bg-gray-900
            transition
            duration-300
            shadow-md
            select-none
            "
        >
          جستجو
        </button>
      </form>

      {/* نقشه */}
      <div className="mt-8 rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "460px", width: "100%" }}
          className="rounded-xl"
        >
          <ChangeView center={position} zoom={15} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup className="font-yekan text-sm">
              مازندران، ساری، خیابان فرهنگ
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}
