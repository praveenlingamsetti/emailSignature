import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Signature from "./components/Signature";
import "./App.css";
import ZipCodeFromExcel from "./components/maps";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster
          toastOptions={{
            duration: 2000,
            style: { borderRadius: "25px", border: "1px solid black" },
          }}
        />
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/signature" element={<Signature />} />
          <Route exact path="/maps" element={<ZipCodeFromExcel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
