import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import LandingPage from "../pages/LandingPage/LandingPage";
import HomePage from "../pages/HomePage/HomePage";
import ChatPage from "../pages/ChatPage/ChatPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/search", element: <HomePage /> },
          { path: "/detail/:workId", element: <ChatPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
