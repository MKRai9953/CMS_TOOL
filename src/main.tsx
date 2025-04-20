import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config.ts";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const config = getConfig();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        {...config}
        authorizationParams={{
          redirect_uri: window.location.origin,
          // audience: config.audience,
        }}
        cacheLocation="localstorage"
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
