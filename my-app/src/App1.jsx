// App1.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/main_page/MainPage";
import LoginPage from "./pages/login_page/LoginPage";
import SignUpPage from "./pages/signup_page/SignUpPage";
import CitizenDashboard from "./pages/citizen_dashboard/CitizenDashboard";
import OfficialDashboard from "./pages/official_dashboard/OfficialDashboard";
import MyYojnaBook from "./pages/citizen_dashboard/MyYojnaBook";
import SearchableDatabasePage from "./pages/official_dashboard/SearchableDatabasePage";

const App1 = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUpPage" element={<SignUpPage />} />
      <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
      <Route path="/OfficialDashboard" element={<OfficialDashboard />} />
      <Route path="/MyYojnaBook" element={<MyYojnaBook />} />
      <Route path="/SearchableDatabasePage" element={<SearchableDatabasePage />} />
    </Routes>
  );
};

export default App1;

