import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const tab = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-1 rounded-full ${
        pathname === to || pathname.startsWith(to)
          ? "bg-gray-900 text-white"
          : "bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-full bg-white/90 backdrop-blur border-b sticky top-0 z-40">
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between px-8 py-3">
        <Link to="/" className="text-xl font-bold">
          Spoil
        </Link>
        <nav className="flex gap-2 text-sm">
          {tab("/search", "Home")}
          {tab("/profile", "My")}
        </nav>
      </header>
    </div>
  );
}
