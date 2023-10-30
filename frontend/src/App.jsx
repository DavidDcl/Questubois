import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import AdultCheck, { isAgeVerified } from "./components/AdultCheck";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import TinderBeer from "./pages/TinderBeer";
import ToutesLesBieres from "./pages/ToutesLesBieres";
import QuestUChoose from "./pages/QuestUChoose";
import Footer from "./components/Footer";

import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [ageVerified, setAgeVerified] = useState(isAgeVerified());
  const [choices, setChoices] = useState(null);
  const handleAgeVerified = (verified) => {
    setAgeVerified(verified);
  };

  return (
    <div>
      {ageVerified ? (
        <div>
          <div>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route
                  path="/Profil"
                  element={<Profil setChoices={setChoices} />}
                />
                <Route
                  path="/TinderBeer"
                  element={<TinderBeer choices={choices} />}
                />
                <Route path="/ToutesLesBieres" element={<ToutesLesBieres />} />
                <Route path="/QuestUChoose" element={<QuestUChoose />} />
              </Routes>
            </BrowserRouter>
          </div>
          <div className="mt-10">
            <Footer />
          </div>
        </div>
      ) : (
        <AdultCheck onAgeVerified={handleAgeVerified} />
      )}
    </div>
  );
}

export default App;
