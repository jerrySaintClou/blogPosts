import LoginForm from "@/Components/LoginForm";
import SignupForm from "@/Components/SignupForm";
import React, { useContext, useState } from "react";
import classes from "../Style/Authentification/Authentification.module.css";
import classesDark from "../Style/Authentification/AuthentificationDark.module.css";
import { MonContexte } from "../Components/Router";
import { UserContexte } from "@/Components/providers/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Authentification() {
  const { themeDark } = useContext(MonContexte);
  // const { themeDark } = useContext(MonContexte);
  const [activeSignupForm, setActiveSignupForm] = useState(false);
  function changeForm() {
    setActiveSignupForm(!activeSignupForm);
  }
  const { user } = useContext(UserContexte);
  const navigate = useNavigate();
  if (user) {
    navigate("/Profil");
  }
  return (
    <div
      className={
        themeDark !== "dark" ? classes.authContainer : classesDark.authContainer
      }
    >
      <h1
        className={
          themeDark !== "dark" ? classes.titleAuth : classesDark.titleAuth
        }
      >
        Authentification
      </h1>
      <br />
      <div
        className={
          themeDark !== "dark" ? classes.boutonDiv : classesDark.boutonDiv
        }
      >
        {activeSignupForm === false ? (
          <button
            className={
              themeDark !== "dark"
                ? classes.boutonStyle
                : classesDark.boutonStyle
            }
            onClick={changeForm}
          >
            LoginForm
          </button>
        ) : (
          <button
            className={
              themeDark !== "dark"
                ? classes.boutonStyle2
                : classesDark.boutonStyle2
            }
            onClick={changeForm}
          >
            LoginForm
          </button>
        )}

        {activeSignupForm === false ? (
          <button
            className={
              themeDark !== "dark"
                ? classes.boutonStyle2
                : classesDark.boutonStyle2
            }
            onClick={changeForm}
          >
            SignupForm
          </button>
        ) : (
          <button
            className={
              themeDark !== "dark"
                ? classes.boutonStyle
                : classesDark.boutonStyle
            }
            onClick={changeForm}
          >
            SignupForm
          </button>
        )}
      </div>
      {activeSignupForm === false ? <LoginForm /> : <SignupForm />}
      <div
        className={
          themeDark !== "dark" ? classes.changeForm : classesDark.changeForm
        }
      >
        {activeSignupForm === false ? (
          <p>Pas encore inscrit ? </p>
        ) : (
          <p>Déja inscrit ? </p>
        )}
        {activeSignupForm === false ? (
          <p
            className={
              themeDark !== "dark"
                ? classes.linkSignupForm
                : classesDark.linkSignupForm
            }
            onClick={changeForm}
          >
            S'inscrire
          </p>
        ) : (
          <p
            className={
              themeDark !== "dark"
                ? classes.linkSignupForm
                : classesDark.linkSignupForm
            }
            onClick={changeForm}
          >
            Se connecter
          </p>
        )}
      </div>
    </div>
  );
}
