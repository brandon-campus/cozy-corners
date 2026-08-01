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
      <div className="md:mx-auto md:w-full md:max-w-4xl md:px-8 md:py-10">
        <header className="px-5 pb-2 pt-[calc(env(safe-area-inset-top)+18px)] md:px-0 md:pt-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tu lista</p>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Guardados</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">{list.length} {list.length === 1 ? "lugar" : "lugares"}</p>
        </header>

        <section className={`px-5 pt-4 md:px-0 md:pt-8 ${list.length > 0 ? "space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3" : ""}`}>
          {list.length === 0 ? (
            <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border p-10 text-center md:mx-auto md:max-w-md">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                <Bookmark className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold">Sin spots guardados</h2>
              <p className="mt-1 max-w-[16rem] text-sm text-muted-foreground">
                Tocá el corazón en cualquier lugar para tenerlo a mano acá.
              </p>
              <Link
                to="/explore"
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:bg-primary/90 active:scale-[0.98]"
              >
                Explorar spots
              </Link>
            </div>
          ) : (
            list.map((p) => <PlaceCard key={p.id} place={p} />)
          )}
        </section>
      </div>
    </AppShell>
  );
}
