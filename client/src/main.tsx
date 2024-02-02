import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
