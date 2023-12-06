import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globemovinglogo from "../images/globemovinglogo.jpg";
import { FaUser } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { FaMobileAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { RxGlobe } from "react-icons/rx";
import tuvlogo from "../images/tuvlogo.png";
import faimpluslogo from "../images/faimpluslogo.jpg";
import fidilogo from "../images/fidilogo.jpg";
import iamlogo from "../images/iamlogo.png";
import omalogo from "../images/omalogo.png";
import imalogo from "../images/imalogo.png";
import paimalogo from "../images/paimalogo.jpg";
import weconnectlogo from "../images/weconnectlogo.jpg";
import handlogo from "../images/handlogo.PNG";
import { SiGooglemaps } from "react-icons/si";

import "../App.css";

function Form() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // const locations = [
  //   { lat: 12.974617449466193, lng: 77.59689253131673, label: "560001" },
  //   { lat: 37.8535385, lng: 23.7796653, label: "530068" },
  //   { lat: 13.364599496078432, lng: 77.44971974705882, label: "560002" },
  //   { lat: 12.997048671193415, lng: 77.57119935226338, label: "560003" },
  //   { lat: 12.945300254545455, lng: 77.57434126428572, label: "560004" },
  // ];

  // const zipCodes = [560001, 560002, 560003, 560004];

  // // localStorage.setItem("locations", JSON.stringify(locations));
  // localStorage.setItem("zipcodes", JSON.stringify(zipCodes));
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChangePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/signature", { state: data });
  };
  const data = { inputs, image };

  const onClickNavigateToMap = () => {
    navigate("/maps");
  };

  return (
    <div>
      <div className="container">
        <div className="top-container">
          <img
            src={globemovinglogo}
            alt="globemovinglogo"
            className="globelogo"
          />
          <div className="icon-details-cont">
            <div className="icon-detail">
              <FaUser size={20} />
              <p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </p>
            </div>
            <div className="icon-detail">
              <LuNetwork size={20} />
              <p>
                <input
                  id="designation"
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={inputs.designation || ""}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </p>
            </div>
            <div className="icon-detail">
              <FaMobileAlt size={20} />
              <p>
                <input
                  id="telephone"
                  type="text"
                  name="tel"
                  placeholder="Phone Number"
                  value={inputs.tel || ""}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </p>
            </div>
            <div className="icon-detail">
              <GoMail size={20} />
              <p>
                <input
                  id="email"
                  type="text"
                  placeholder="Email ID"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </p>
            </div>
            <div className="icon-detail">
              <BiSolidPhoneCall size={20} />
              <p>
                <input
                  id="officeNo"
                  type="text"
                  placeholder="Company Mobile Number"
                  name="officeNo"
                  value={inputs.officeNo || ""}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </p>
            </div>
            <div className="icon-detail">
              <MdLocationPin size={20} />
              <p>
                <input
                  id="officeAddress"
                  type="text"
                  placeholder="Company Location"
                  name="officeAddress"
                  value={inputs.officeAddress || ""}
                  onChange={handleChange}
                />
              </p>
            </div>
            <div className="icon-detail">
              <RxGlobe
                size={20}
                style={{ marginLeft: "-50px", marginRight: "20px" }}
              />
              <p className="detail1">www.globemoving.net</p>
            </div>
          </div>
          <div className="file">
            <label style={{ fontSize: "16px" }}>
              <input
                type="file"
                accept="image/*"
                name="pic"
                onChange={handleChangePic}
              />
              Upload Image
            </label>
          </div>
        </div>
        <div className="second-container">
          <h1 className="answer">THE ANSWER IS YES</h1>
          <div className="logos-container">
            <img src={tuvlogo} alt="tuv" className="logo1" />
            <img src={faimpluslogo} alt="faimplus" className="logo2" />
            <img src={fidilogo} alt="fidi" className="logo3" />
            <img src={iamlogo} alt="iam" className="logo4" />
            <img src={omalogo} alt="oma" className="logo5" />
            <img src={imalogo} alt="ima" className="logo6" />
            <img src={paimalogo} alt="paima" className="logo7" />
            <img src={weconnectlogo} alt="weconnect" className="logo8" />
          </div>
        </div>
        <div className="third-container">
          <h6 className="service">
            Services: Home Moving | Office Moving | Asset Moving | Data Center
            Moving | Vehicle Moving | Pet Moving |
          </h6>
          <h6 className="indust">
            Industrial Moving | Lab Moving | Health Care Logistics | Hospitality
            Logistics | Storage | Warehousing
          </h6>
        </div>
        <div className="fourth-container">
          <p className="branch">
            Our Branches In India: Bangalore | Chennai | Delhi | Kolkata |
            Mumbai | Pune | Cochin
          </p>
        </div>
        <div className="fifth-container">
          <img src={handlogo} alt="hand" className="hand" />
          <p className="email">
            Please consider the environment before printing this e-mail!
          </p>
        </div>
      </div>
      <div className="btn-container">
        <button type="submit" onClick={handleSubmit} className="submit">
          Submit Changes
        </button>
        <div style={{ width: "10px" }}></div>
        <div onClick={onClickNavigateToMap}>
          <SiGooglemaps className="maps-icon" />
          <span style={{ fontSize: "14px" }}>Maps</span>
        </div>
      </div>
    </div>
  );
}

export default Form;
