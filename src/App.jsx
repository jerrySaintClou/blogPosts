import { createContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Router from "./Components/Router";
import UserProvider from "./Components/providers/UserProvider";
// import "./App.css";

function App() {
  // console.log(user);
  return (
    <UserProvider>
      <main>
        <Router />
      </main>
    </UserProvider>
  );
}

export default App;
