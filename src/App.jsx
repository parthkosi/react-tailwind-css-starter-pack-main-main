import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import Groups from "./components/Groups";
import SignupPage from "./pages/SignupPage";
import Account from "./components/Account";
import Friends from "./components/Friends";
import Activity from "./components/Activity";
import Dashboard from "./components/Dashboard";

function Layout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/GroupPage/groups" element={<Groups />} />
        <Route path="/GroupPage/account" element={<Account />} />
        <Route path="/GroupPage/friends" element={<Friends />} />
        <Route path="/GroupPage/activity" element={<Activity />} />
        <Route path="/GroupPage/dashboard" element={<Dashboard />} />
        <Route path="/GroupPage/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
