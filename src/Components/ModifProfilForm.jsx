import React, { useContext, useState } from "react";
import classes from "../Style/Profil/ModifProfilForm/ModifProfilForm.module.css";
import classesDark from "../Style/Profil/ModifProfilForm/ModifProfilFormDark.module.css";
import { MonContexte } from "../Components/Router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "./Error";
import { UserContexte } from "./providers/UserProvider";

export default function ModifProfilForm() {
  const [backEndError, setBackEndError] = useState("");
  const { user, setUser } = useContext(UserContexte);
  const { id, email } = user;
  const modifProfilSchema = z.object({
    username: z
      .string({ message: "Votre username doit être en chaine de caractère" })
      .min(2, { message: "Votre username doit avoir au moins 2 lettre" }),
    avatarUrl: z.string({
      message: "Votre url n'est pas une chaine de caractere",
    }),
    // avatarUrl: z.object(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(modifProfilSchema),
  });
  const { themeDark } = useContext(MonContexte);

  async function modifProfilUser(data) {
    setBackEndError("");
    const { username, avatarUrl } = data;
    console.log("data to send", data);
    const token = localStorage.getItem("token");
    // console.log(token);
    const reponse = await fetch("/api/users/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, avatarUrl }),
    });
    const dataReponse = await reponse.json();
    setUser({ ...user, username: username, avatarUrl: avatarUrl });
    // console.log(dataReponse);
    // console.log(user);
    if (!dataReponse.success) {
      setBackEndError("Un problème est survenu!");
      return;
    }
  }
  return (
    <form
      className={
        themeDark !== "dark"
          ? classes.formModifProfil
          : classesDark.formModifProfil
      }
      onSubmit={handleSubmit(modifProfilUser)}
    >
      {/* <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="photoProfil" className={classes.labelModifProfil}>
          choississez une image de profil
        </label>
        <input
          type="file"
          name=""
          id="photoProfil"
          {...register("avatarUrl")}
        />
        <Error>{errors.avatarUrl?.message}</Error>
      </div> */}

      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="photoProfil" className={classes.labelModifProfil}>
          choississez une image de profil
        </label>
        <input
          type="text"
          name=""
          id="photoProfil"
          {...register("avatarUrl")}
          placeholder="Ecrivez le liens de votre image"
        />
        <Error>{errors.avatarUrl?.message}</Error>
      </div>

      <br />
      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="modifName">Changer le nom de votre profil</label>
        <input
          type="text"
          name=""
          id="modifName"
          placeholder="nouveau nom profil"
          {...register("username")}
        />
        <Error>{errors.username?.message}</Error>
      </div>
      <br />
      <button>Modifier le profil</button>
    </form>
  );
}
