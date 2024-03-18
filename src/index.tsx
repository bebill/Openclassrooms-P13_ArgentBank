import "./sass/main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/utils/store";

import { Header } from "./layout/Header";
import { Home } from "./pages/home";
import { Footer } from "./layout/Footer";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Error404 } from "./pages/error404";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
