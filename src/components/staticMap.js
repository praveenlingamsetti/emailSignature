// Import necessary libraries
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const StaticMap = () => {
  const [locations, setLocations] = useState([]);
  const zipCodes = ["530068", "560001", "560002", "560003", "560004"];

  const customIcon = new Icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Function to fetch coordinates for ZIP code using a geocoding service
  const getCoordinatesFromZIP = async (zipCode) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${zipCode}&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLocations((prevLocations) => [
          ...prevLocations,
          { lat: parseFloat(lat), lng: parseFloat(lon), label: zipCode },
        ]);
      }
    } catch (error) {
      console.error("Error fetching coordinates for ZIP code:", error);
    }
  };

  useEffect(() => {
    zipCodes.forEach((zipCode) => {
      getCoordinatesFromZIP(zipCode);
    });
  }, []); // Ensure this runs only once

  return (
    <MapContainer
      center={[12, 77]} // Centered around the indias
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location, index) => (
        <Marker
          icon={customIcon}
          key={index}
          position={[location.lat, location.lng]}
        >
          <Popup>{location.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StaticMap;
