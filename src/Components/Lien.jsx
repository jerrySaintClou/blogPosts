import React from "react";
import { NavLink } from "react-router-dom";

export default function Lien(props) {
  return (
    <NavLink
      to={props.url}
      style={({ isActive }) => {
        return {
          borderBottom: isActive ? "3px solid black" : "1px solid #f3c659",
          width: props.width,
          height: props.height,
          backgroundColor: props.backgroundColor,
          display: props.display,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
          fontSize: props.fontSize,
        };
      }}
    >
      {props.children}
    </NavLink>
  );
}
