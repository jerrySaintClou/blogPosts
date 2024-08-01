import React, { useContext, useState } from "react";
import classes from "../Style/LoginForm/LoginForm.module.css";
import classesDark from "../Style/LoginForm/LoginFormDark.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContexte } from "@/Components/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { MonContexte } from "../Components/Router";

export default function LoginForm() {
  const { themeDark } = useContext(MonContexte);
  const { setUser } = useContext(UserContexte);
  const [backEndError, setBackEndError] = useState("");
  const navigate = useNavigate();

  const loginChemin = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(7, { message: "Mot de passe trop court! " }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginChemin),
  });
  async function login(data) {
    const { email, password } = data;
    //console.log(data);
    const reponse = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const donnee = await reponse.json();
    // console.log(donnee);
    //console.log(donnee.data.access_token);
    if (!donnee.success) {
      setBackEndError("Un problème est survenu!");
      return;
    }
    localStorage.setItem("token", donnee.data.access_token);
    setUser(donnee.data.user);
    // console.log(user);

    navigate("/Profil");
    // const { email, password } = data;
    // const reponse = await fetch("/api/users/me", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, username, password }),
    // });
  }
  return (
    <form
      className={
        themeDark !== "dark" ? classes.loginForm : classesDark.loginForm
      }
      onSubmit={handleSubmit(login)}
    >
      <div
        className={
          themeDark !== "dark"
            ? classes.inputLoginForm
            : classesDark.inputLoginForm
        }
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name=""
          id="email"
          placeholder="Ecrivez votre email"
          {...register("email")}
        />
        <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.email?.message}
        </p>
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
          placeholder="Ecrivez votre mot de passe"
          {...register("password")}
        />
        <p style={{ color: "red", marginLeft: "1%" }}>
          {errors.password?.message}
        </p>
      </div>
      <button type="submit">Se Connecter</button>
    </form>
  );
}
