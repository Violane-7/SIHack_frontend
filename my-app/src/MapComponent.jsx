import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import styles from "./MapComponent.module.css"; // your custom CSS
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import landGeoJson from "./assets/land.json" with { type: "json" };
import entitiesGeoJson from "./assets/entities.json" with { type: "json" };

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

// 🔹 Function to style features based on their properties
function getFeatureStyle(feature) {
  const props = feature.properties;

  // Natural features
  if (props.natural) {
    switch (props.natural) {
      case "wood":
        return { color: "green", fillColor: "green", fillOpacity: 0.4 };
      case "water":
        return { color: "blue", fillColor: "blue", fillOpacity: 0.4 };
      default:
        return { color: "gray", fillColor: "gray", fillOpacity: 0.4 };
    }
  }

  // Landuse features
  if (props.landuse) {
    switch (props.landuse) {
      case "forest":
        return { color: "darkgreen", fillColor: "darkgreen", fillOpacity: 0.4 };
      case "residential":
        return { color: "orange", fillColor: "orange", fillOpacity: 0.4 };
      default:
        return { color: "gray", fillColor: "gray", fillOpacity: 0.4 };
    }
  }

  // Highway features (lines)
  if (props.highway) {
    switch (props.highway) {
      case "trunk":
        return { color: "red", weight: 3 };
      case "residential":
        return { color: "yellow", weight: 2 };
      default:
        return { color: "gray", weight: 2 };
    }
  }

  // fallback
  return { color: "black", fillColor: "black", fillOpacity: 0.4 };
}

// 🔹 Main Map Component
export default function MapComponent() {
  const [position, setPosition] = useState(null);

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
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer
        center={[20.5937, 78.9629]} // India center
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <LocationOnClick setPosition={setPosition} />

        <LayersControl position="topright">
          {/* Base Map */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />

          {/* Land GeoJSON overlay */}
          <LayersControl.Overlay name="Land Owners">
            <GeoJSON data={landGeoJson} style={getFeatureStyle} />
          </LayersControl.Overlay>

          {/* Entities GeoJSON overlay */}
          <LayersControl.Overlay name="Assets">
            <GeoJSON data={entitiesGeoJson} style={getFeatureStyle} />
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
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "50%",
          border: "none",
          background: "#1976d2",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 999,
        }}
      >
        📍
      </button>
    </div>
  );
}
