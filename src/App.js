import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Signature from "./components/Signature";
import "./App.css";
import ZipCode from "./components/maps";
import StaticMap from "./components/staticMap";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/signature" element={<Signature />} />
          {/* <Route exact path="/maps" element={<ZipCode />} /> */}
          <Route exact path="/maps" element={<StaticMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
