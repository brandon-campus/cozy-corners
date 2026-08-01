import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Bookmark, User, Coffee, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="app-shell flex min-h-screen flex-col">
      {!hideNav && <TopNav />}
      <div className={`flex-1 ${hideNav ? "" : "pb-24 md:pb-0 pt-0 md:pt-16"}`}>{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur md:flex">
      <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
        <Coffee className="h-5 w-5 text-primary" />
        WorkSpot
      </Link>
      <div className="flex items-center gap-6">
        <TopNavItem to="/explore" label="Explorar" active={path.startsWith("/explore") || path.startsWith("/place")} />
        <TopNavItem to="/saved" label="Guardados" active={path.startsWith("/saved")} />
        <TopNavItem to="/profile" label="Perfil" active={path.startsWith("/profile")} />
      </div>
    </nav>
  );
}

function TopNavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-1 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2">
        <NavItem to="/explore" label="Explorar" icon={Compass} active={path.startsWith("/explore") || path.startsWith("/place")} />
        <NavItem to="/saved" label="Guardados" icon={Bookmark} active={path.startsWith("/saved")} />
        <NavItem to="/profile" label="Perfil" icon={User} active={path.startsWith("/profile")} />
      </div>
    </nav>
  );
}

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: LucideIcon; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "stroke-[2.4]" : ""}`} />
      {label}
    </Link>
  );
}
