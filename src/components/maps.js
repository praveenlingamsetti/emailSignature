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
  const previousZipcodes = JSON.parse(localStorage.getItem("zipCodes")) || [];
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
      const extractedLocations = data.map((row) => row.Zipcodes);
      //console.log("Extracted locations", extractedLocations);

      // const zipCodes = extractedLocations.map((location) => ({
      //   zipCode: location.Zipcodes,
      //   label: location.Zipcodes,
      // }));

      console.log(extractedLocations);
      const newZipcodes = extractedLocations.filter(
        (zip) => !previousZipcodes.some((prevZip) => prevZip === zip)
      );

      if (previousZipcodes.length > 0) {
        setZipCodes(newZipcodes);
      } else {
        setZipCodes(extractedLocations);
      }

      // console.log(newZipcodes);
      // console.log(previousZipcodes);
      // console.log(...newZipcodes, ...previousZipcodes);
      const updatedZipCodes = [...newZipcodes, ...previousZipcodes];
      //console.log();
      localStorage.setItem("zipCodes", JSON.stringify(updatedZipCodes));
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
        `https://nominatim.openstreetmap.org/search?q=${each}&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        if (lat && lon) {
          setLocations((prevLocations) => [
            ...prevLocations,
            { lat: parseFloat(lat), lng: parseFloat(lon), label: each },
          ]);
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
  }, [zipCodes]);

  //console.log(locations);

  useEffect(() => {
    // Remove duplicates using Set
    const uniqueLocations = Array.from(
      new Set(locations.map(JSON.stringify))
    ).map(JSON.parse);

    // Set unique locations to localStorage
    localStorage.setItem("locations", JSON.stringify(uniqueLocations));
  }, [locations]);

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
        center={[12.972442, 77.580643]} // Centered around the india
        zoom={5}
        style={{ height: "400px", width: "80%", margin: "auto" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations?.map((location, index) => (
          <Marker
            icon={customIcon}
            key={index}
            position={[location.lat, location.lng]}
          >
            <Popup>{location?.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default ZipCodeFromExcel;
