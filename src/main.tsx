import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { P1Acceptance } from "./app/P1Acceptance";
import { MascotProvider } from "./components";
import mascotSprite from "../brand/mascot-states.png";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MascotProvider spriteSrc={mascotSprite}>
      {new URLSearchParams(window.location.search).has("p1-acceptance") ? <P1Acceptance /> : <App />}
    </MascotProvider>
  </React.StrictMode>,
);
