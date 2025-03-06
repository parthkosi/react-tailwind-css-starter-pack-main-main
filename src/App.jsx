import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GroupPage from "./pages/GroupPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

function Layout() {
  const location = useLocation();

  // Define valid paths where Navbar should be shown
  const validPaths = ["/", "/GroupPage", "/Signup"];
  const showNavbar = validPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <h1>Navbar Here</h1>} {/* Replace with your Navbar component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/GroupPage/*" element={<GroupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
