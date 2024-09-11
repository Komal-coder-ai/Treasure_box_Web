import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/footer/index";
import "./index.css";
import UseScrollToTop from "../../components/topOpen";
import HeaderSection from "../../Componentsnew/headsection";
import Newhome from "../newhome";
import BacktoHome from "../../components/backtohome";

const Main = ({ reload, setReload, catval, setCatval }) => {
  const { pathname } = useLocation();
  const [fontval, setFontval] = useState("");

  // Define colors for the home page
 
  // Determine if current route is home page
  const isHomePage = pathname === "/";

  return (
    <>
      <UseScrollToTop />

      <HeaderSection
        {...{ reload, setReload, fontval, setFontval, catval, setCatval }}
      />
      <div className="section_body">
        {isHomePage ? (
          <Newhome {...{ reload, setReload, catval, setCatval }} />
        ) : (
          <Outlet />
        )}
        <Footer/>
         
      </div>
      <BacktoHome />
    </>
  );
};

export default Main;
