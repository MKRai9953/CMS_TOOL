import WelcomePage from "./pages/WelcomePage";
import { Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts.tsx";
import User from "./pages/User.tsx";
import Dashboard from "./pages/DashBoard.tsx";
import { ToastContainer } from "react-toastify";
import CreatePosts from "./pages/CreatePosts.tsx";
export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={"/"} element={<WelcomePage />} />
        <Route path={"user"} element={<User />}>
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"create"} element={<CreatePosts />} />
          <Route path={"posts"} element={<Posts />}>
            <Route path=":id" />
          </Route>
          <Route path={"edit/:id"} element={<CreatePosts />} />
        </Route>
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </>
  );
}
