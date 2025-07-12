// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabNavigation from "./components/TabNavigation";
import MainIconHeader from "./components/MainIconHeader";
import MyPage from "./pages/MyPage";
import DirectVoice from "./pages/DirectVoice";
import SearchByCondition from "./pages/SearchByCondition";
import RegisterPage from "./pages/RegisterPage";
import EditProfilePage from "./pages/EditProfilePage";

export default function App() {
  return (
    <Router>
      <MainIconHeader />
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/direct-voice" element={<DirectVoice />} />
        <Route path="/search" element={<SearchByCondition />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
      <TabNavigation />
    </Router>
  );
}

// src/components/MainIconHeader.jsx
import React from "react";
import icon from "../assets/mainicon.jpeg";

export default function MainIconHeader() {
  return (
    <div className="w-full text-center py-2">
      <img src={icon} alt="コイコイ" className="mx-auto h-16" />
    </div>
  );
}

// src/components/TabNavigation.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TabNavigation() {
  const location = useLocation();

  const tabs = [
    { label: "マイページ", path: "/" },
    { label: "ダイレクトボイス", path: "/direct-voice" },
    { label: "条件で探す", path: "/search" },
    { label: "新機能", path: "/new-feature" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`text-sm text-center ${
            location.pathname === tab.path ? "font-bold text-pink-600" : "text-gray-600"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
