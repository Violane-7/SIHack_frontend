import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
  useMapEvents,
  GeoJSON,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import styles from "./MapComponent.module.css"; // your custom CSS
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Import default geojsons (you can pass overrides via props)
import defaultForest from "../assets/forest.json";
import defaultWater from "../assets/water.json";

// ✅ Fix default Leaflet marker in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🔹 Component to smoothly fly to a location
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);

  return null;
}

// 🔹 Component to update position on map click
function LocationOnClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// 🔹 Main Map Component
// Accept either imported JSON props or fall back to bundled defaults
export default function MapComponent({
  forestData: forestDataProp = null,
  waterData: waterDataProp = null,
}) {
  const [position, setPosition] = useState(null);

  // use provided data or defaults
  const forestData = forestDataProp || defaultForest;

  const waterData = waterDataProp || defaultWater;

  // styles
  const forestStyle = {
    color: "#2e7d32",
    weight: 1,
    fillColor: "#66bb6a",
    fillOpacity: 0.35,
    interactive: false,
  };
  const waterStyle = {
    color: "#1565c0",
    weight: 1,
    fillColor: "#42a5f5",
    fillOpacity: 0.35,
    interactive: false,
  };

  // Function to get current location
  const goToCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          alert("Please allow location access in browser settings.");
        } else {
          console.error(err);
        }
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div style={{ height : "50vh",width: "100%", position: "relative" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <LocationOnClick setPosition={setPosition} />

        <LayersControl position="topright">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />

          {/* Always render a LayerGroup so LayersControl shows the option even if data is empty */}
          <LayersControl.Overlay name="Forests" checked>
            <LayerGroup>
              {forestData ? (
                <GeoJSON data={forestData} style={forestStyle} />
              ) : null}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Water" checked>
            <LayerGroup>
              {waterData ? (
                <GeoJSON data={waterData} style={waterStyle} />
              ) : null}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {/* Dynamic marker for current location */}
        {position && (
          <>
            <Marker position={position}>
              <Popup>You are here 📍</Popup>
            </Marker>
            <FlyToLocation position={position} />
          </>
        )}
      </MapContainer>

      {/* Floating button to get current location */}
      <button
        onClick={goToCurrentLocation}
        style={{
          position: "relative", // absolute relative to wrapper
          top: "-90px",
          right: "-90%",
          padding: "10px 15px",
          borderRadius: "50%",
          border: "none",
          background: "#1976d2",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 9999, // above map
        }}
      >
        📍
      </button>
    </div>
  );
}
