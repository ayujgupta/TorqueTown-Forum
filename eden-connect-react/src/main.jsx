// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { TokenProvider } from "./utils/TokenContext";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <TokenProvider>
  <App />
  </TokenProvider>
  // </StrictMode>
);
