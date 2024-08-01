import React, { useContext, useEffect, useState } from "react";
import Lien from "./Lien";
import { Menu, Moon, Newspaper, Sun } from "lucide-react";
import logo from "../assets/logo.png";
import classes from "../Style/NavBar/NavBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MonContexte } from "./Router";
import { UserContexte } from "@/Components/providers/UserProvider";

export default function NavBar() {
  const { themeDark, setThemeDark } = useContext(MonContexte);
  const [activeMenu, setActiveMenu] = useState(false);
  const { user, setUser } = useContext(UserContexte);
  // console.log(themeDark);
  //  const [themeDark, setThemeDark] = useState(localStorage.getItem("theme"));

  function activeBoutonMenu() {
    setActiveMenu(!activeMenu);
  }

  function changeTheme() {
    const oldTheme = localStorage.getItem("theme");
    if (oldTheme === null) {
      setThemeDark("dark");
      return localStorage.setItem("theme", "dark");
    }

    const newTheme = oldTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);

    setThemeDark(newTheme);
  }
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <>
      <div
        className={themeDark === "dark" ? classes.barNavDark : classes.barNav}
      >
        <Link to="/" className={classes.logo}>
          {/* <img src={logo} alt="" /> */}
          <Newspaper className={classes.logoImage} />
          <span>BlogPost</span>
        </Link>
        <div className={classes.liensNavBar}>
          <NavLink
            style={({ isActive }) => {
              return {
                borderBottom: isActive ? "3px solid #3D9A84" : "",
              };
            }}
            to="/"
            className={classes.leLien}
          >
            Accueil
          </NavLink>
          {user ? (
            <NavLink
              style={({ isActive }) => {
                return {
                  borderBottom: isActive ? "3px solid #3D9A84" : "",
                };
              }}
              to="/Profil"
              className={classes.leLien}
            >
              Profil
            </NavLink>
          ) : (
            <></>
          )}

          {!user ? (
            <NavLink
              style={({ isActive }) => {
                return {
                  borderBottom: isActive ? "3px solid #3D9A84" : "",
                };
              }}
              to="/Authentification"
              className={classes.leLien}
            >
              Authentification
            </NavLink>
          ) : (
            <Link
              //to="/Authentification"
              className={classes.leLien}
              onClick={logout}
            >
              Se deconnecter
            </Link>
          )}

          <NavLink
            style={({ isActive }) => {
              return {
                borderBottom: isActive ? "3px solid #3D9A84" : "",
              };
            }}
            to="/Contact"
            className={classes.leLien}
          >
            Contact
          </NavLink>
          <Menu className={classes.menu} onClick={activeBoutonMenu} />
          <div className={classes.changeThemeDivDark} onClick={changeTheme}>
            {themeDark !== "dark" ? <Sun /> : <Moon />}
          </div>
        </div>
      </div>
      <div
        className={
          activeMenu == false ? classes.barNavVertical : classes.animation1
        }
      >
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: isActive ? "3px solid black" : "1px solid #e6be78",
            };
          }}
          to="/"
          className={classes.lienVertical}
        >
          Accueil
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: isActive ? "3px solid black" : "1px solid #e6be78",
            };
          }}
          to="/Authentification"
          className={classes.lienVertical}
        >
          Authentification
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              borderBottom: isActive ? "3px solid black" : "1px solid #e6be78",
            };
          }}
          to="/Contact"
          className={classes.lienVertical}
        >
          Contact
        </NavLink>
      </div>
    </>
  );
}
