// Check if user is authenticated by checking for a token in localStorage
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // returns true if token exists
};

// Set token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove token (use on logout)
export const clearToken = () => {
  localStorage.removeItem("token");
};
