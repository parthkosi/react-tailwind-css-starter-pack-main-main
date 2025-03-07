import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import GroupPage from "./pages/GroupPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

function Layout() {
  const location = useLocation();

  // Define valid paths where Navbar should be shown
  const validPaths = ["/"];
  const showNavbar = validPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <h1>Navbar Here</h1>}{" "}
      {/* Replace with your Navbar component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/GroupPage/*" element={<GroupPage />} />
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
