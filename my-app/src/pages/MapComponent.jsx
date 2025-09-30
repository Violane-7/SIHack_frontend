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

import defaultCiti from "../assets/citi.json";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import styles from "./MapComponent.module.css";

// Leaflet marker fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Default data imports
import defaultForest from "../assets/forest.json";
import defaultWater from "../assets/water.json";
import defaultFarm from "../assets/Farms.json";
import defaultResidence from "../assets/house.json";

// Fly to location
function FlyToLocation({ position, zoom = 16 }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, zoom);
  }, [position, zoom, map]);
  return null;
}

// Click to set location
function LocationOnClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapComponent({ mode = 1 }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (mode === 2) {
      setPosition([20.11284, 82.48419]);
    } else if (mode === 3) {
      setPosition([20.11492, 82.48561]);
    }
  }, [mode]);

  // Determine zoom level based on mode
  const defaultZoom = mode === 3 ? 18 : 16; // closer zoom for mode 3

  // Layer checked states
  const forestChecked = false;
  const waterChecked = false;
  const farmChecked = false;
  const claimsChecked = false; // Only mode 2 shows Claims layer

  // Styles
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
  const farmStyle = {
    color: "#ffa726",
    weight: 1,
    fillColor: "#ffcc80",
    fillOpacity: 0.35,
    interactive: false,
  };
  const residenceStyle = {
    color: "#8e24aa",
    weight: 1,
    fillColor: "#ce93d8",
    fillOpacity: 0.35,
    interactive: false,
  };
  const citiStyle = {
    color: "#8e24aa",
    weight: 2,
    fillColor: "#ef9a9a",
    fillOpacity: 0.35,
    interactive: false,
  };

  // Get current location
  const goToCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => {
        if (err.code === err.PERMISSION_DENIED)
          alert("Please allow location access.");
        else console.error(err);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div style={{ height: "50vh", width: "100%", position: "relative" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom
        className={styles.map}
      >
        <LocationOnClick setPosition={setPosition} />
        {mode === 3 && <GeoJSON data={defaultCiti} style={citiStyle} />}
        <LayersControl position="topright">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />

          <LayersControl.Overlay name="Forests">
            <LayerGroup>
              <GeoJSON data={defaultForest} style={forestStyle} />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Water">
            <LayerGroup>
              <GeoJSON data={defaultWater} style={waterStyle} />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Farms">
            <LayerGroup>
              <GeoJSON data={defaultFarm} style={farmStyle} />
            </LayerGroup>
          </LayersControl.Overlay>

          {mode === 2 && (
            <LayersControl.Overlay name="Claims">
              <LayerGroup>
                <GeoJSON data={defaultResidence} style={residenceStyle} />
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </LayersControl>

        {position && (
          <>
            <Marker position={position}>
              <Popup>
                You clicked here 📍 <br />
                Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
              </Popup>
            </Marker>
            <FlyToLocation position={position} zoom={mode === 3 ? 18 : 16} />
          </>
        )}
      </MapContainer>

      <button
        onClick={goToCurrentLocation}
        style={{
          position: "relative",
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
          zIndex: 9999,
        }}
      >
        📍
      </button>
    </div>
  );
}
