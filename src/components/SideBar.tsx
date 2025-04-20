import { useAuth0 } from "@auth0/auth0-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth0();
  const navItems = [
    { name: "Dashboard", path: "./dashboard" },
    { name: "Create", path: "./create" },
    { name: "Posts", path: "./posts" },
  ];
  return (
    <aside className="flex flex-col justify-between w-64 bg-white shadow-md min-h-screen">
      <div>
        <div className="flex p-6 font-bold text-indigo-600 text-xl border-b">
          <div className="w-7 h-7 contain-content rounded-2xl border shadow">
            <img className="" src={user?.picture} />
          </div>
          <span className="ml-3 mb-1 ">{` ${user && user.nickname}`}</span>
        </div>
        <ul className="p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded hover:bg-indigo-100 ${
                  location.pathname.includes(item.name.toLowerCase())
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className=" px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 pb-3 mx-4 mb-4"
      >
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
