import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Share2, Wifi, Plug, Volume2, Users, Clock, MapPin, Sparkles, TicketPercent } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getPlace } from "@/lib/mock-places";
import { useFavorites } from "@/lib/use-favorites";

export const Route = createFileRoute("/place/$id")({
  component: PlaceDetail,
  loader: ({ params }) => {
    const place = getPlace(params.id);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.place.name ?? "Spot"} · WorkSpot` },
      { name: "description", content: loaderData?.place.curatedReview ?? "Detalle del spot" },
    ],
  }),
});

function PlaceDetail() {
  const { place } = Route.useLoaderData();
  const { has, toggle } = useFavorites();
  const navigate = useNavigate();
  const fav = has(place.id);

  return (
    <AppShell>
      {/* gallery */}
      <div className="relative">
        <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto">
          {place.gallery.map((g, i) => (
            <img key={i} src={g} alt="" className="aspect-[4/3] w-full shrink-0 snap-center object-cover" loading={i === 0 ? "eager" : "lazy"} />
          ))}
        </div>
        <button
          onClick={() => navigate({ to: "/explore" })}
          className="absolute left-4 top-[calc(env(safe-area-inset-top)+14px)] grid h-10 w-10 place-items-center rounded-full bg-background/95 shadow-md backdrop-blur"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="absolute right-4 top-[calc(env(safe-area-inset-top)+14px)] flex gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-background/95 shadow-md backdrop-blur" aria-label="Compartir">
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggle(place.id)}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/95 shadow-md backdrop-blur"
            aria-label="Guardar"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-primary stroke-primary" : ""}`} />
          </button>
        </div>
      </div>

      <div className="space-y-6 px-5 pb-8 pt-5">
        <header>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-foreground">
              {place.type === "cafe" ? "Cafetería" : "Coworking"}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">{place.price}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight">{place.name}</h1>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {place.neighborhood} · {place.distanceKm} km
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {place.hours}
          </p>
        </header>

        {/* work stats */}
        <section className="grid grid-cols-2 gap-2">
          <Stat icon={Wifi} label="Wifi" value={`${place.wifi}`} sub={place.wifiSpeed} highlight />
          <Stat icon={Plug} label="Enchufes" value={place.outlets} />
          <Stat icon={Volume2} label="Ambiente" value={place.noise} />
          <Stat icon={Users} label="Mesas grandes" value={place.bigTables ? "Sí" : "No"} />
        </section>

        {/* curated review */}
        <section className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Reseña del equipo WorkSpot
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">"{place.curatedReview}"</p>
        </section>

        {/* prices */}
        <section>
          <h2 className="font-display text-lg font-semibold">Precios de referencia</h2>
          <ul className="mt-2 divide-y divide-border rounded-2xl border border-border bg-card">
            {place.priceRefs.map((p) => (
              <li key={p.label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>{p.label}</span>
                <span className="font-semibold text-primary">{p.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* highlights */}
        <section>
          <h2 className="font-display text-lg font-semibold">Destacados de la carta</h2>
          <ul className="mt-2 space-y-2">
            {place.highlights.map((h) => (
              <li key={h.name} className="rounded-2xl bg-secondary/60 p-3">
                <p className="text-sm font-semibold">{h.name}</p>
                <p className="text-xs text-muted-foreground">{h.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/95 px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3 backdrop-blur">
        <Link
          to="/coupon/$id"
          params={{ id: place.id }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 active:scale-[0.99]"
        >
          <TicketPercent className="h-5 w-5" /> Ver cupón de descuento
        </Link>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value, sub, highlight }: {
  icon: typeof Wifi; label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-3 ${highlight ? "border-accent/30 bg-accent/10" : "border-border bg-card"}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className={`h-3.5 w-3.5 ${highlight ? "text-accent" : ""}`} /> {label}
      </div>
      <p className="mt-1 text-sm font-semibold capitalize text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
