import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "./components/redux-provider/Redux-Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter basename="">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
