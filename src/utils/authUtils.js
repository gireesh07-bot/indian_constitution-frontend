// Authentication utility functions

export const authUtils = {
  // Save user session
  saveSession: (user) => {
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userId", user.id);
  },

  // Get current user
  getCurrentUser: () => {
    return {
      id: localStorage.getItem("userId"),
      email: localStorage.getItem("userEmail"),
      role: localStorage.getItem("userRole"),
      name: localStorage.getItem("userName"),
    };
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("userEmail");
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem("userRole");
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  },

  // Redirect based on role
  redirectByRole: (role, navigate) => {
    if (role === "Citizen") {
      navigate("/citizen");
    } else if (role === "Admin") {
      navigate("/admin");
    } else if (role === "Educator") {
      navigate("/educator");
    } else if (role === "Legal Expert") {
      navigate("/legal");
    }
  },
};
