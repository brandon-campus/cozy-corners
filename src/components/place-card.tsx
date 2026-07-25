import { Link } from "@tanstack/react-router";
import { Heart, Wifi, MapPin } from "lucide-react";
import type { Place } from "@/lib/mock-places";
import { useFavorites } from "@/lib/use-favorites";

export function PlaceCard({ place }: { place: Place }) {
  const { has, toggle } = useFavorites();
  const fav = has(place.id);

  return (
    <Link
      to="/place/$id"
      params={{ id: place.id }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform active:scale-[0.99]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={place.photo} alt={place.name} className="h-full w-full object-cover" loading="lazy" />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggle(place.id); }}
          aria-label={fav ? "Quitar de guardados" : "Guardar"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/95 shadow-sm backdrop-blur"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-primary stroke-primary" : "stroke-foreground"}`} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground/80 backdrop-blur">
          {place.type === "cafe" ? "Cafetería" : "Coworking"}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold leading-tight">{place.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {place.neighborhood} · {place.distanceKm} km
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-foreground/70">{place.price}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent-foreground/80 ring-1 ring-accent/25">
            <Wifi className="h-3 w-3 text-accent" /> Wifi {place.wifi}
          </span>
          <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
            {place.noise}
          </span>
          {place.bigTables && (
            <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
              mesas grandes
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
