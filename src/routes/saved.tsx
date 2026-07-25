import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlaceCard } from "@/components/place-card";
import { PLACES } from "@/lib/mock-places";
import { useFavorites } from "@/lib/use-favorites";

export const Route = createFileRoute("/saved")({
  component: Saved,
  head: () => ({
    meta: [
      { title: "Guardados · WorkSpot" },
      { name: "description", content: "Tus spots guardados para trabajar en CABA." },
    ],
  }),
});

function Saved() {
  const { favs } = useFavorites();
  const list = PLACES.filter((p) => favs.includes(p.id));

  return (
    <AppShell>
      <header className="px-5 pb-2 pt-[calc(env(safe-area-inset-top)+18px)]">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tu lista</p>
        <h1 className="font-display text-3xl font-bold">Guardados</h1>
        <p className="mt-1 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "lugar" : "lugares"}</p>
      </header>

      <section className="space-y-4 px-5 pt-4">
        {list.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border p-10 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
              <Bookmark className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold">Sin spots guardados</h2>
            <p className="mt-1 max-w-[16rem] text-sm text-muted-foreground">
              Tocá el corazón en cualquier lugar para tenerlo a mano acá.
            </p>
            <Link
              to="/explore"
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Explorar spots
            </Link>
          </div>
        ) : (
          list.map((p) => <PlaceCard key={p.id} place={p} />)
        )}
      </section>
    </AppShell>
  );
}
