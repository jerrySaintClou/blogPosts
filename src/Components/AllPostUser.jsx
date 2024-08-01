import React, { useContext, useEffect, useState } from "react";
import classes from "@/Style/Posts/PostUserLogged/PostUserLogged.module.css";
import classesDark from "@/Style/Posts/PostUserLogged/PostUserLoggedDark.module.css";
import { MonContexte } from "./Router";

export default function AllPostUser() {
  const [postUser, setPostUser] = useState([]);
  const { themeDark } = useContext(MonContexte);
  useEffect(() => {
    async function getPostUser() {
      const reponse = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await reponse.json();
      setPostUser(data.data.posts);
      //   console.log(data);
    }
    getPostUser();
  }, []);
  return (
    <div
      className={
        themeDark !== "dark"
          ? classes.allPostsUserLogged
          : classesDark.allPostsUserLogged
      }
    >
      {postUser.map((post, index) => {
        return (
          <div
            key={index}
            className={
              themeDark !== "dark" ? classes.cardPost : classesDark.cardPost
            }
          >
            <p>{post.user.username}</p>
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
