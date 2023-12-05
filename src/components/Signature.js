import React, { useRef,useState } from 'react';
import html2canvas from 'html2canvas';
import { toPng, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';
import {useLocation} from 'react-router-dom'
import globemovinglogo from '../images/globemovinglogo.jpg'
import {FaUser} from 'react-icons/fa'
import {LuNetwork} from 'react-icons/lu'
import {FaMobileAlt} from  'react-icons/fa'
import {GoMail} from 'react-icons/go'
import {BiSolidPhoneCall}  from  'react-icons/bi'
import {MdLocationPin} from 'react-icons/md'
import {RxGlobe} from 'react-icons/rx'
import tuvlogo from '../images/tuvlogo.png'
import faimpluslogo from '../images/faimpluslogo.jpg'
import fidilogo from '../images/fidilogo.jpg'
import iamlogo from '../images/iamlogo.png'
import omalogo from '../images/omalogo.png'
import imalogo from '../images/imalogo.png'
import paimalogo from '../images/paimalogo.jpg'
import weconnectlogo from '../images/weconnectlogo.jpg'
import handlogo from '../images/handlogo.PNG'
import './index.css'

function Signature() {
    const location=useLocation()
    const [data,]=useState(location.state)
    const [file, setFile] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const canvasRef = useRef(null);
    const componentRef = useRef();
    console.log(data.inputs.name)
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    
        // Clear the resized image when a new image is selected
        setResizedImage(null);
      };
      const handleDownloadImages = async () => {
        // Convert React component to SVG image
        const svgBlob = await toSvg(componentRef.current);
        saveAs(svgBlob, `${data.inputs.name}.svg`); // Download the SVG image
    
        // Convert React component to PNG image
        const pngBlob = await toPng(componentRef.current);
        saveAs(pngBlob, `${data.inputs.name}.png`); // Download the PNG image
      };

    const handleResize=()=>{
        if (canvasRef.current && file) {
            const img = new Image();
            const reader = new FileReader();
      
            reader.onload = function (e) {
              img.src = e.target.result;
              img.onload = function () {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
      
                // Set the desired width and height for the resized image
                const desiredWidth = 800;
                const desiredHeight = 500;
      
                // Calculate the aspect ratio
                const aspectRatio = img.width / img.height;
      
                // Calculate the new width and height while maintaining the aspect ratio
                let newWidth = desiredWidth;
                let newHeight = desiredWidth / aspectRatio;
                if (newHeight > desiredHeight) {
                  newHeight = desiredHeight;
                  newWidth = desiredHeight * aspectRatio;
                }
      
                // Set the canvas size to match the new width and height
                canvas.width = newWidth;
                canvas.height = newHeight;
      
                // Draw the image onto the canvas with the desired size
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
                // Convert the canvas content to a Data URL (base64)
                const resizedDataURL = canvas.toDataURL('image/png',1.0);
      
                setResizedImage(resizedDataURL);
              };
            };
      
            reader.readAsDataURL(file);
          }
    }
    // const handleDownloadpng=()=>{
    //   const svgNode=canvasRef.current
    //   const canvas = document.createElement('canvas');
    // canvas.width = svgNode.clientWidth;
    // canvas.height = svgNode.clientHeight;

    // const ctx = canvas.getContext('2d');
    // const DOMURL = window.URL || window.webkitURL;
    // const svgData = new XMLSerializer().serializeToString(svgNode);
    // const img = new Image();

    // const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    // const url = DOMURL.createObjectURL(svgBlob);

    // img.onload = function () {
    //   ctx.drawImage(img, 0, 0);

    //   // Convert canvas to PNG and trigger download
    //   const pngData = canvas.toDataURL('image/png');
    //   const link = document.createElement('a');
    //   link.download = 'converted_image.png';
    //   link.href = pngData;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   DOMURL.revokeObjectURL(url);
    // };

    // img.src = url;
    // }
    const handleFileChang = (event) => {
      const file = event.target.files[0];
      if (file) {
        convertSVGtoPNG(file);
      }
    };
    const convertSVGtoPNG = (svgFile) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const svgData = event.target.result;
        const canvas = document.createElement('canvas');
        const img = new Image();
  
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
  
          // Convert canvas to PNG and trigger download
          const pngData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${data.inputs.name}_resize.png`;
          link.href = pngData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
  
        img.src = svgData;
      };
  
      reader.readAsDataURL(svgFile);
    };
    const handleDownload = () => {
      html2canvas(fileInputRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${data.inputs.name}_signature.png`;
        link.href = imgData;
        link.click();
      });
    };
  return (
    <div>
        <div ref={componentRef} style={{paddingTop:'5px',paddingBottom:'15px',left:'0px',paddingRight:'-30px',marginTop:'0px',marginBottom:'-30px',height:'100vh',objectFit:'scale-down'}}>
            <div className='top-cont'>
                <img src={globemovinglogo} alt='globemovinglogo' className='globelogo' />
                <div className='icon-details-cont'>
                    <div className='icon-detail'>
                        <FaUser size={20} style={{marginTop:'5px'}}/>
                        <p className='detail'>{data.inputs.name}</p>
                    </div>
                    <div className='icon-detail'>
                        <LuNetwork size={20} style={{marginTop:'5px'}}/>
                        <p className='detail'>{data.inputs.designation}</p>
                    </div>
                    <div className='icon-detail'>
                        <FaMobileAlt size={20} style={{marginTop:'5px'}}/>
                        <p className='detail'>{data.inputs.tel}</p>
                    </div>
                    <div className='icon-detail'>
                        <GoMail size={20} style={{marginTop:'5px'}}/>
                        <p className='detail'>{data.inputs.email}</p>
                    </div>
                    <div className='icon-detail'>
                        <BiSolidPhoneCall size={20} style={{marginTop:'5px'}} />
                        <p className='detail'>{data.inputs.officeNo}</p>
                    </div>
                    <div className='icon-detail'>
                        <MdLocationPin size={20} style={{marginTop:'5px'}}/>
                        <p className='detail' style={{fontSize:'18px'}}>{data.inputs.officeAddress}</p>
                    </div>
                    <div className='icon-detail'>
                        <RxGlobe size={20} style={{marginTop:'5px'}}/>
                        <p className='detail'>www.globemoving.net</p>
                    </div>
                </div>
                <img src={data.image} alt='pic' className='globelogo' />
            </div>
            <div className='second-cont'>
            <h1 className='answer'>THE ANSWER IS YES</h1>
            <div className='logos-container'>
                <img src={tuvlogo} alt='tuv' className='logo1'/>
                <img src={faimpluslogo} alt='faimplus' className='logo2' />
                <img src={fidilogo} alt='fidi' className='logo3'/>
                <img src={iamlogo} alt='iam' className='logo4' />
                <img src={omalogo} alt='oma' className='logo5'/>
                <img src={imalogo} alt='ima' className='logo6' />
                <img src={paimalogo} alt='paima'  className='logo7'/>
                <img src={weconnectlogo} alt='weconnect' className='logo8'/>
            </div>
            </div>
            <div className='third-cont'>
                <h6 className='service1'>Services: Home Moving | Office Moving | Asset Moving | Data Center Moving | Vehicle Moving | Pet Moving |</h6>
                <h6 className='indust1'>Industrial Moving | Lab Moving | Health Care Logistics | Hospitality Logistics | Storage | Warehousing</h6>
            </div>
            <div className='fourth-cont'>
                <p className='branch'>Our Branches In India: Bangalore | Chennai | Delhi | Kolkata | Mumbai | Pune | Cochin</p>
            </div>
            <div className='fifth-cont'>
            <img src={handlogo} alt='hand' className='hand' />
            <p className='email'>Please consider the environment before printing this e-mail!</p>
        </div>
        </div>
        <button onClick={handleDownloadImages} className='download'>Download</button>
        {/* <input type="file" accept=".svg" onChange={handleFileChange} />
      <button onClick={handleResize}>Resize Image</button>
      {resizedImage && <div style={{width:'900px'}}>
        <img ref={fileInputRef} onChange={handleFileChang}src={resizedImage} alt="Resized Pic" style={{padding:'0px'}}/> 
        </div>}
      <canvas ref={canvasRef}  style={{ display: 'none' }}>Download</canvas>
      <button onClick={handleDownload}>Downloadpng</button> */}
    </div>
  )
}

export default Signature