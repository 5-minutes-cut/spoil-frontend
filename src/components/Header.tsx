import { Link, useLocation } from "react-router-dom";
import { Home, Logo, Profile } from "../assets/icons";

function NavButton({
  to,
  active,
  icon,
  label,
}: {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className={[
        "inline-flex items-center gap-2 rounded-3xl px-5 py-2 text-sm transition",
        active ? "bg-brand-secondary font-bold" : "text-gray-800",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname.startsWith("/search") || pathname === "/home";
  const isMy = pathname.startsWith("/profile");

  return (
    <div className="w-full bg-bg-white/90 backdrop-blur border-b border-b-gray-200 sticky top-0 z-40">
      <header className="max-w-4xl w-full mx-auto flex">
        <div className="w-full flex h-14 items-center justify-between px-4">
          <Link to="/search" className="flex items-center gap-2">
            <img className="h-5 w-5" src={Logo} />
            <span className="text-lg font-semibold text-brand-primary">
              LOCKSPO
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <NavButton
              to="/search"
              active={isHome}
              icon={<img src={Home} className="h-5 w-5" />}
              label="홈"
            />
            <NavButton
              to="/profile"
              active={isMy}
              icon={<img src={Profile} className="h-5 w-5" />}
              label="마이페이지"
            />
          </nav>
        </div>
      </header>
    </div>
  );
}
