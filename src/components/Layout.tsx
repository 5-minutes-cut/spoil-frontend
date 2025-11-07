import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const { pathname } = useLocation();
  const showHeader = pathname !== "/";

  return (
    <div className="w-full min-h-screen bg-bg-default">
      {showHeader && <Header />}
      <main className="mx-auto w-full max-w-4xl px-12 py-4">
        <Outlet />
      </main>
    </div>
  );
}
