import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Branch from "./components/pages/Branch";
import InfoProvider, { InfoContext } from "./components/context/InfoContext";
import Menu from "./components/pages/Menu";
import Basket from "./components/pages/Basket";
import About from "./components/pages/About";
import ContactUs from "./components/pages/ContactUs";
import Questions from "./components/pages/Questions";
import Rules from "./components/pages/Rules";
import Privacy from "./components/pages/Privacy";
import Panel from "./components/pages/Panel";
import { useContext, useEffect } from "react";
import axios from 'axios';

function App() {
  return (
      <Router>
    <InfoProvider>
        <Routes>
            <Route path="" element={<Home />} />

            <Route path="branch/:slug" element={<Branch />} />
            <Route path="menu" element={<Menu />} />
            <Route path="basket" element={<Basket />} />
            <Route path="About-us" element={<About />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="questions" element={<Questions />} />
            <Route path="rules" element={<Rules />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="profile" element={<Panel />} />
            <Route path="profile/:slug" element={<Panel />} />
        </Routes>
    </InfoProvider>
      </Router>

  );
}

export default App;
