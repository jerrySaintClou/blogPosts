import React, { useContext, useEffect, useState } from "react";
import classes from "../Style/Footer/Footer.module.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { MonContexte } from "./Router";
import { Newspaper } from "lucide-react";

export default function Footer() {
  const { themeDark } = useContext(MonContexte);
  return (
    <div>
      <footer
        className={themeDark !== "dark" ? classes.footer : classes.footerDark}
      >
        <Link to="/" className={classes.logo}>
          {/* <img src={logo} alt="" /> */}
          <Newspaper className={classes.logoImage} />
          <span>BlogPost</span>
        </Link>
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: isActive ? "3px solid #3D9A84" : "",
            };
          }}
          to="/PrivacyPolicy"
          className={classes.leLien}
        >
          Politique de Confidentialiter
        </NavLink>
      </footer>
    </div>
  );
}
