import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import Groups from "./components/Groups";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Account from "./components/Account";
import Friends from "./components/Friends";
import Activity from "./components/Activity";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { store } from "./redux/slice/Store";
import { Provider } from "react-redux";

function Layout() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />

      {/* Private Routes */}
      <Route path="/GroupPage" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="groups" element={<Groups />} />
        <Route path="account" element={<Account />} />
        <Route path="friends" element={<Friends />} />
        <Route path="activity" element={<Activity />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
