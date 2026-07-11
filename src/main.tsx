import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// App and Store
import App from "./App";
import { store } from "./app/store";

// Global Styles
import "./index.css";

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Redux Provider makes the store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);