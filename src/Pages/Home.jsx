import React, { useContext } from "react";
import classes from "../Style/Home/Home.module.css";
import classesDark from "../Style/Home/HomeDark.module.css";
import { MonContexte } from "../Components/Router";
import AllPostUser from "@/Components/AllPostUser";

export default function Home() {
  const { themeDark } = useContext(MonContexte);
  return (
    <div
      className={
        themeDark !== "dark" ? classes.containerHome : classesDark.containerHome
      }
    >
      <h1>Bienvenue dans la page d'accueil</h1>
      <p>Voici tous le posts</p>
      <AllPostUser />
    </div>
  );
}
