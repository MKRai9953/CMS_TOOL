import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const WelcomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("./user/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleClick = () => {
    loginWithRedirect();
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full transform transition hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome 👋</h1>
        <p className="text-gray-600 mb-6">Please log in to continue.</p>
        <button
          onClick={handleClick}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 pb-3"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
