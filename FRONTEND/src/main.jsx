import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";

import { Provider } from 'react-redux';
import { store } from "./store.js";
import { AuthProvider } from "./context/AuthContext";  // Import your AuthProvider

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>  {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);
