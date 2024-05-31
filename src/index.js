import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./pages/App/App";
import "../src/libs/i18n/i18n.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense>
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
