import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-bg-default">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-12 py-4">
        <Outlet />
      </main>
    </div>
  );
}
