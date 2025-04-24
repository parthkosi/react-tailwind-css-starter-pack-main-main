import { useNavigate, useLocation } from "react-router-dom";
import { clearToken } from "../utils/auth";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to handle logout
  const handleLogout = () => {
    toast.success("Logout Successfully");
    clearToken(); // Private Routing
    navigate("/login"); // Redirect to login
  };

  return (
    <div>
      <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-48 bg-white border-r border-black flex flex-col flex-wrap shadow-lg">
        <div className="flex flex-col flex-wrap">
          {[
            { name: "Dashboard", path: "/GroupPage/dashboard" },
            { name: "Groups", path: "/GroupPage/groups" },
            { name: "Friends", path: "/GroupPage/friends" },
            { name: "Activity", path: "/GroupPage/activity" },
            { name: "Account", path: "/GroupPage/account" },
          ].map(({ name, path }) => (
            <button
              key={name}
              onClick={() => handleNavigation(path)}
              className={`p-3 border-b border-gray-200 transition-all ${
                location.pathname === path
                  ? "bg-gray-800 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-2 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
