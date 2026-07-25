import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Bookmark, User, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="app-shell">
      <div className={hideNav ? "" : "pb-24"}>{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/95 backdrop-blur">
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
