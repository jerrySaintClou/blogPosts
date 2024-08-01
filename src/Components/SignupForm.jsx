import React, { useContext, useState } from "react";
import classes from "../Style/LoginForm/LoginForm.module.css";
import classesDark from "../Style/LoginForm/LoginFormDark.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "./Error";
import { MonContexte } from "../Components/Router";

export default function SignupForm() {
  const [backEndError, setBackEndError] = useState("");
  const { themeDark } = useContext(MonContexte);
  const registerVerification = z
    .object({
      email: z.string().email({ message: "Email invalid" }),
      password: z
        .string()
        .refine(
          (value) =>
            /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[^A-Za-z0-9].*[^A-Za-z0-9]).{8,}$/.test(
              value
            ),
          {
            message:
              "Le mot de passe doit contenir au moins 8 caractères, dont 2 majuscules, 2 chiffres et 2 caractères spéciaux",
          }
        ),
      confirmPassword: z.string(),

      username: z
        .string({ message: "Votre username doit être en chaine de caractère" })
        .min(2, { message: "Votre username doit avoir au moins 2 lettre" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Les mots de passe sont differents ",
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerVerification),
  });

  async function registerUser(data) {
    //console.log(data);
    setBackEndError("");
    const { email, username, password } = data;
    const reponse = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const dataReponse = await reponse.json();
    //console.log(dataReponse);
    if (!dataReponse.success) {
      setBackEndError("Un problème est survenu!");
      return;
    }
  }

  return (
    <form
      className={
        themeDark !== "dark" ? classes.loginForm : classesDark.loginForm
      }
      onSubmit={handleSubmit(registerUser)}
    >
      <div
        className={
          themeDark !== "dark"
            ? classes.inputLoginForm
            : classesDark.inputLoginForm
        }
      >
        <label htmlFor="Prenom">Prenom</label>
        <input
          type="text"
          name=""
          id="Prenom"
          placeholder="Ecrivez votre prénom"
          {...register("username")}
        />
        {/* <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.username?.message}
        </p> */}
        <Error>{errors.username?.message}</Error>
      </div>

      <div
        className={
          themeDark !== "dark"
            ? classes.inputLoginForm
            : classesDark.inputLoginForm
        }
      >
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name=""
          id="Email"
          placeholder="Ecrivez votre email"
          {...register("email")}
        />
        {/* <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.email?.message}
        </p> */}
        <Error>{errors.email?.message}</Error>
      </div>

      <div
        className={
          themeDark !== "dark"
            ? classes.inputLoginForm
            : classesDark.inputLoginForm
        }
      >
        <label htmlFor="mdp">Mot de passe</label>
        <input
          type="password"
          name=""
          id="mdp"
          placeholder="Ecrivez votre Mot de passe"
          {...register("password")}
        />
        {/* <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.password?.message}
        </p> */}
        <Error>{errors.password?.message}</Error>
      </div>

      <div
        className={
          themeDark !== "dark"
            ? classes.inputLoginForm
            : classesDark.inputLoginForm
        }
      >
        <label htmlFor="ConfirmMdp">Confirmation de mot de passe</label>
        <input
          type="password"
          name=""
          id="ConfirmMdp"
          placeholder="Réécrivez votre Mot de passe"
          {...register("confirmPassword")}
        />
        {/* <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.confirmPassword?.message}
        </p> */}
        <Error>{errors.confirmPassword?.message}</Error>
      </div>
      <button>S'inscrire</button>
      {/* <p>{backEndError}</p> */}
      <Error>{backEndError}</Error>
    </form>
  );
}
