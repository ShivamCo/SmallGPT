import { BrowserRouter, Routes, Route } from "react-router-dom"


import Template from "./component/Template";
import LoginPage from "./Pages/LoginPage";
import MainBody from "./component/MainBody";
import RegisterPage from "./Pages/RegisterPage";

function App() {

  return (


    <BrowserRouter>

      <Template />

      <Routes>

        <Route path="/" element={< MainBody />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/register" element={< RegisterPage />} />
        

      </Routes>


    </BrowserRouter>


  );
}

export default App;
