import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, MapPin, Bookmark, Bell, HelpCircle, ChevronRight, Coffee } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useFavorites } from "@/lib/use-favorites";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({
    meta: [
      { title: "Perfil · WorkSpot" },
      { name: "description", content: "Tu perfil en WorkSpot." },
    ],
  }),
});

function Profile() {
  const { favs } = useFavorites();

  return (
    <AppShell>
      <header className="px-5 pb-4 pt-[calc(env(safe-area-inset-top)+18px)]">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Perfil</p>
      </header>

      <section className="mx-5 flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold">
          M
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl font-bold">Martina F.</h1>
          <p className="truncate text-sm text-muted-foreground">Freelance · Palermo</p>
        </div>
      </section>

      <section className="mx-5 mt-4 grid grid-cols-3 gap-2">
        <Stat n={12} label="Visitados" icon={Coffee} />
        <Stat n={favs.length} label="Guardados" icon={Bookmark} />
        <Stat n={4} label="Cupones" icon={MapPin} />
      </section>

      <section className="mx-5 mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        <Row icon={Bookmark} label="Mis guardados" to="/saved" />
        <Row icon={Bell} label="Notificaciones" />
        <Row icon={HelpCircle} label="Ayuda y feedback" />
      </section>

      <div className="mx-5 mt-8">
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-semibold text-destructive">
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">WorkSpot · v0.1 prototipo</p>
      </div>
    </AppShell>
  );
}

function Stat({ n, label, icon: Icon }: { n: number; label: string; icon: typeof Coffee }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-primary" />
      <p className="mt-1 font-display text-xl font-bold leading-none">{n}</p>
      <p className="mt-1 text-[11px] font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ icon: Icon, label, to }: { icon: typeof Coffee; label: string; to?: string }) {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : <button className="w-full text-left">{inner}</button>;
}
