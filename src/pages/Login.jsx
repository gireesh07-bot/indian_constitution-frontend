import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../services/api";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidGmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    if (!isValidGmail(email)) {
      setError("Email must end with @gmail.com");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN LOGIC - Call Backend API
        const response = await userAPI.login(email, password);
        
        // ✅ STORE LOGIN SESSION
        localStorage.setItem("userEmail", response.email);
        localStorage.setItem("userRole", response.role);
        localStorage.setItem("userName", response.name);
        localStorage.setItem("userId", response.id);

        // ✅ REDIRECT
        if (response.role === "Citizen") {
          navigate("/citizen", { replace: true });
        } else if (response.role === "Admin") {
          navigate("/admin", { replace: true });
        } else if (response.role === "Educator") {
          navigate("/educator", { replace: true });
        } else if (response.role === "Legal Expert") {
          navigate("/legal", { replace: true });
        }

      } else {
        // SIGNUP LOGIC - Call Backend API
        if (!name || !email || !password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }

        await userAPI.register(name, email, password, role);

        alert("Account created successfully! Please login.");

        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setRole("Citizen");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Constitution Portal
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Learn • Understand • Empower
          </p>
        </div>

        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 ${
              isLogin
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 ${
              !isLogin
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            >
              <option>Citizen</option>
              <option>Admin</option>
              <option>Educator</option>
              <option>Legal Expert</option>
            </select>
          </>
        )}

        <input
          type="email"
          placeholder="Enter Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (isLogin ? "Logging in..." : "Creating Account...") : (isLogin ? "Login" : "Create Account")}
        </button>

      </div>
    </div>
  );
}

export default Login;
