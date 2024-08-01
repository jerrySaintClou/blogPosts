import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "../Style/Contact/Contact.module.css";
import classesDark from "../Style/Contact/ContactDark.module.css";
import { MonContexte } from "../Components/Router";

export default function Contact() {
  const { themeDark } = useContext(MonContexte);
  return (
    <div
      className={
        themeDark !== "dark"
          ? classes.containerContact
          : classesDark.containerContact
      }
    >
      <h1>Page de Contact</h1>
    </div>
  );
}
