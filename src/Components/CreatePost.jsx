import React, { useContext } from "react";
import classes from "../Style/Profil/ModifProfilForm/ModifProfilForm.module.css";
import classesDark from "../Style/Profil/ModifProfilForm/ModifProfilFormDark.module.css";
import { MonContexte } from "../Components/Router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "./Error";

export default function CreatePost() {
  const { themeDark } = useContext(MonContexte);

  const createPostSchema = z.object({
    title: z
      .string({ message: "Votre title doit être en chaine de caractère" })
      .min(2, { message: "Votre title doit avoir au moins 2 lettre" }),
    description: z
      .string({ message: "Votre description doit être en chaine de caractère" })
      .min(2, { message: "Votre description doit avoir au moins 2 lettre" }),
    content: z
      .string({ message: "Votre content doit être en chaine de caractère" })
      .min(2, { message: "Votre content doit avoir au moins 2 lettre" }),
    imageUrl: z.string({
      message: "Votre imageUrl doit être en chaine de caractère",
    }),

    // avatarUrl: z.object(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  async function postCreate(data) {
    const { title, description, content, imageUrl } = data;
    console.log(data);
    const token = localStorage.getItem("token");
    const reponse = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, content, imageUrl }),
    });
    const dataReponse = await reponse.json();
    // console.log(dataReponse);
  }

  return (
    <form
      className={
        themeDark !== "dark"
          ? classes.formModifProfil
          : classesDark.formModifProfil
      }
      onSubmit={handleSubmit(postCreate)}
    >
      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="modifName">Title post</label>
        <input
          type="text"
          name=""
          id="modifName"
          placeholder="Titre du post"
          {...register("title")}
        />
        <Error>{errors.title?.message}</Error>
      </div>
      <br />

      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="modifName">Description post</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          {...register("description")}
        ></textarea>
        <Error>{errors.description?.message}</Error>
      </div>
      <br />

      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label htmlFor="modifName">Content post</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          {...register("content")}
        ></textarea>
        <Error>{errors.content?.message}</Error>
      </div>
      <br />

      <div
        className={
          themeDark !== "dark"
            ? classes.divInputModifProfil
            : classesDark.divInputModifProfil
        }
      >
        <label
          htmlFor="photoProfil"
          className={
            themeDark !== "dark"
              ? classes.divInputModifProfil
              : classesDark.divInputModifProfil
          }
        >
          choississez une image de votre post
        </label>
        <input
          type="text"
          name=""
          id="photoProfil"
          placeholder="Ecrivez le liens de l'image de votre post"
          {...register("imageUrl")}
        />
        <Error>{errors.imageUrl?.message}</Error>
      </div>
      <br />

      <br />
      <button>Creer le post</button>
    </form>
  );
}
