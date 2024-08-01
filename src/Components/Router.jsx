import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PrivacyPolicy from "@/Pages/PrivacyPolicy";
import Authentification from "@/Pages/Authentification";
import Cookie from "./Cookie";
import Profil from "@/Pages/Profil";

export const MonContexte = createContext();

export default function Router() {
  //var d'etat
  const [themeDark, setThemeDark] = useState(
    localStorage.setItem("themeDark", false)
  );

  // console.log(themeDark);

  return (
    <MonContexte.Provider
      value={{ themeDark: themeDark, setThemeDark: setThemeDark }}
    >
      <BrowserRouter>
        <NavBar />
        {/* <Cookie /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Authentification" element={<Authentification />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MonContexte.Provider>
  );
}
