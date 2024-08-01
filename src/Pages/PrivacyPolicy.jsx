import React, { useContext } from "react";
import classes from "../Style/PrivacyPolicy/PrivacyPolicy.module.css";
import classesDark from "../Style/PrivacyPolicy/PrivacyPolicyDark.module.css";
import { MonContexte } from "../Components/Router";

export default function PrivacyPolicy() {
  const { themeDark } = useContext(MonContexte);
  return (
    <div
      className={
        themeDark !== "dark"
          ? classes.containerPrivacyPolicy
          : classesDark.containerPrivacyPolicy
      }
    >
      <h1>Politique de confidentialité</h1>
    </div>
  );
}
