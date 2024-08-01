import React, { useContext, useState } from "react";
import { UserContexte } from "@/Components/providers/UserProvider";
import classes from "../Style/Profil/Profil.module.css";
import classesDark from "../Style/Profil/ProfilDark.module.css";
import { MonContexte } from "../Components/Router";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import ModifProfilForm from "@/Components/ModifProfilForm";
import CreatePost from "@/Components/CreatePost";
import PostUserLogged from "@/Components/PostUserLogged";

export default function Profil() {
  const [changeFormProfil, setChangeFormProfil] = useState("modifier profil");
  const { user } = useContext(UserContexte);
  const { themeDark } = useContext(MonContexte);
  // console.log(user);
  const token = localStorage.getItem("token");
  // console.log(token);

  const navigate = useNavigate();

  function changeToModifyProfil() {
    setChangeFormProfil("modifier profil");
  }

  function changeToCreatePost() {
    setChangeFormProfil("creer post");
  }

  function seePostUserLogged() {
    setChangeFormProfil("voir les posts");
  }

  if (!token) {
    navigate("/Authentification");
  }
  if (!user) {
    return <h1>Chargement ...</h1>;
  } else {
    const { username, email, avatarUrl } = user;
    // console.log(user);
    return (
      <div
        className={
          themeDark !== "dark"
            ? classes.containerProfil
            : classesDark.containerProfil
        }
      >
        <h1
          className={
            themeDark !== "dark"
              ? classes.titlePageProfil
              : classesDark.titlePageProfil
          }
        >
          Page Profil de {username}
        </h1>
        <br />
        <div
          className={
            themeDark !== "dark" ? classes.infoProfil : classesDark.infoProfil
          }
        >
          <div
            className={
              themeDark !== "dark"
                ? classes.imageProfil
                : classesDark.imageProfil
            }
          >
            {avatarUrl == undefined ? (
              <UserRound
                className={
                  themeDark !== "dark"
                    ? classes.logoProfil
                    : classesDark.logoProfil
                }
              />
            ) : (
              <img src={avatarUrl} />
            )}
          </div>
          <br />
          <p>{email}</p>
          <p>{username}</p>
        </div>
        <br />

        <div className={classes.boutonsProfil}>
          {changeFormProfil === "modifier profil" ? (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle
                  : classesDark.boutonProfilStyle
              }
              onClick={changeToModifyProfil}
            >
              Modifier Profil
            </button>
          ) : (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle2
                  : classesDark.boutonProfilStyle2
              }
              onClick={changeToModifyProfil}
            >
              Modifier Profil
            </button>
          )}
          {changeFormProfil === "creer post" ? (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle
                  : classesDark.boutonProfilStyle
              }
              onClick={changeToCreatePost}
            >
              Creer Post
            </button>
          ) : (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle2
                  : classesDark.boutonProfilStyle2
              }
              onClick={changeToCreatePost}
            >
              Creer Post
            </button>
          )}

          {changeFormProfil === "voir les posts" ? (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle
                  : classesDark.boutonProfilStyle
              }
              onClick={seePostUserLogged}
            >
              Voir vos posts
            </button>
          ) : (
            <button
              className={
                themeDark !== "dark"
                  ? classes.boutonProfilStyle2
                  : classesDark.boutonProfilStyle2
              }
              onClick={seePostUserLogged}
            >
              Voir vos posts
            </button>
          )}
        </div>
        <br />
        {changeFormProfil === "modifier profil" ? (
          <ModifProfilForm />
        ) : changeFormProfil === "creer post" ? (
          <CreatePost />
        ) : (
          <PostUserLogged />
        )}
      </div>
    );
  }
}
