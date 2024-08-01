import React, { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContexte = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const tokenUser = localStorage.getItem("token");
      const reponse = await fetch("/api/users/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });
      const donnee = await reponse.json();
      console.log(donnee.data.user);
      setUser(donnee.data.user);
    }
    getUser();
  }, []);
  return (
    <UserContexte.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContexte.Provider>
  );
}
