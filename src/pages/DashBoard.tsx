import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="mt-auto min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
        <div className="ml-auto mr-auto rounded-full shadow hover:scale-105 transition-all w-[10rem] h-[10rem] border border-blue-500">
          <img
            src={user?.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        </div>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
        {user?.nickname && (
          <p className="text-sm mt-1">Nickname: {user?.nickname}</p>
        )}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/user/posts")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Posts
          </button>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
