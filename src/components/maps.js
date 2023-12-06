//  Import necessary libraries
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import * as XLSX from "xlsx";
import { CgArrowLongLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const ZipCodeFromExcel = () => {
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem("locations")) || []
  ); //localStorage.getItem("Location")
  const [zipCodes, setZipCodes] = useState([]);

  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const extractedLocations = data.map((row) => ({
        label: row.Location,
        zipCode: row.ZipCode,
      }));
      //console.log("Extracted locations", extractedLocations);

      const zipCodes = extractedLocations.map((location) => ({
        zipCode: location.zipCode,
        label: location.label,
      }));
      //previousZipcodes=localStorage.getItem('zipcodes')
      const newZipcodes = "zipcodes whose not in previouscodes";
      setZipCodes(zipCodes);

      localStorage.setItem("zipCodes", zipCodes);
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const customIcon = new Icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Function to fetch coordinates for ZIP code using a geocoding service
  const getCoordinatesFromZIP = async (each) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${each.zipCode}&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        if (lat && lon) {
          setLocations((prevLocations) => [
            ...prevLocations,
            { lat: parseFloat(lat), lng: parseFloat(lon), label: each.label },
          ]);

          if (each === zipCodes[-1]) {
            localStorage.setItem("Locations", [
              ...locations,
              { lat: parseFloat(lat), lng: parseFloat(lon), label: each.label },
            ]);
          }
        } else {
          console.error("Latitude or longitude is undefined");
        }
      } else {
        console.error("No coordinates found for ZIP code");
      }
    } catch (error) {
      console.error("Error fetching coordinates for ZIP code:", error);
    }
  };

  useEffect(() => {
    zipCodes.forEach((each) => {
      getCoordinatesFromZIP(each);
    });
  }, []);

  return (
    <>
      <div className="top-container-map">
        <CgArrowLongLeft size={15} />
        <span onClick={() => navigate("/")}> Back</span>
        <input
          style={{ marginTop: "20px" }}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>
      <MapContainer
        center={[12, 77]} // Centered around the indias
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations?.map((location, index) => (
          <Marker
            icon={customIcon}
            key={index}
            position={[location.lat, location.lng]}
          >
            <Popup>{location.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default ZipCodeFromExcel;
