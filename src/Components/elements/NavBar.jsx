import { brand } from "@/configs/brand";
import React from "react";

export default function NavBar() {
  return (
    <header>
      <nav>
        <div>
          <h1>{brand.name}</h1>
        </div>
        <ul>{}</ul>
      </nav>
    </header>
  );
}
