import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { MascotProvider } from "./components";
import mascotSprite from "../brand/mascot-states.png";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MascotProvider spriteSrc={mascotSprite}>
      <App />
    </MascotProvider>
  </React.StrictMode>,
);
