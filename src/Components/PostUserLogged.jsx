import React, { useContext, useEffect, useState } from "react";
import classes from "@/Style/Posts/PostUserLogged/PostUserLogged.module.css";
import classesDark from "@/Style/Posts/PostUserLogged/PostUserLoggedDark.module.css";
import { MonContexte } from "./Router";
import { UserContexte } from "./providers/UserProvider";

export default function PostUserLogged() {
  const [postUserLogged, setPostUserLogged] = useState([]);
  const { themeDark } = useContext(MonContexte);
  const { user } = useContext(UserContexte);
  console.log(user);
  useEffect(() => {
    async function getPostUserLogged() {
      const token = localStorage.getItem("token");
      const reponse = await fetch("/api/users/me/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await reponse.json();
      setPostUserLogged(data.data.posts);
      console.log(data.data.posts);
    }
    getPostUserLogged();
  }, []);
  return (
    <div
      className={
        themeDark !== "dark"
          ? classes.allPostsUserLogged
          : classesDark.allPostsUserLogged
      }
    >
      {postUserLogged.map((post, index) => {
        return (
          <div
            key={index}
            className={
              themeDark !== "dark" ? classes.cardPost : classesDark.cardPost
            }
          >
            <img src={post.imageUrl} />
            <p>
              Title:<span>{post.title}</span>
            </p>
            <p>
              Description:<span>{post.description}</span>
            </p>
            <p>
              content:<span>{post.content}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
