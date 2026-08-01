import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Map as MapIcon, List, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlaceCard } from "@/components/place-card";
import { NEIGHBORHOODS, PLACES, type PlaceType, type WifiQuality } from "@/lib/mock-places";
import mapImg from "@/assets/map-caba.jpg";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({
    meta: [
      { title: "Explorar spots · WorkSpot" },
      { name: "description", content: "Mapa y lista de cafeterías y coworkings en CABA para trabajar." },
    ],
  }),
});

type View = "map" | "list";

function Explore() {
  const [view, setView] = useState<View>("list");
  const [q, setQ] = useState("");
  const [type, setType] = useState<PlaceType | "todos">("todos");
  const [price, setPrice] = useState<"todos" | "$" | "$$" | "$$$">("todos");
  const [wifi, setWifi] = useState<"todas" | WifiQuality>("todas");
  const [hood, setHood] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return PLACES.filter((p) => {
      if (q && !`${p.name} ${p.neighborhood}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (type !== "todos" && p.type !== type) return false;
      if (price !== "todos" && p.price !== price) return false;
      if (wifi !== "todas" && p.wifi !== wifi) return false;
      if (hood !== "Todos" && p.neighborhood !== hood) return false;
      return true;
    });
  }, [q, type, price, wifi, hood]);

  return (
    <AppShell>
      <div className="md:flex md:h-[calc(100vh-64px)] md:overflow-hidden">
        {/* Left Col: Header & List */}
        <div className="md:flex md:w-1/2 lg:w-[45%] md:flex-col md:border-r border-border">
          <header className="sticky top-0 z-30 bg-background/95 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+14px)] backdrop-blur md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Buenos Aires</p>
                <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">Explorar spots</h1>
              </div>
              <div className="flex items-center rounded-full bg-secondary p-1 md:hidden">
                <button
                  onClick={() => setView("map")}
                  className={`grid h-8 w-8 place-items-center rounded-full transition ${view === "map" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                  aria-label="Mapa"
                >
                  <MapIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`grid h-8 w-8 place-items-center rounded-full transition ${view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                  aria-label="Lista"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar café, barrio…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={() => setShowFilters((s) => !s)}
                className={`grid h-11 w-11 place-items-center rounded-full border border-border ${showFilters ? "bg-primary text-primary-foreground" : "bg-card"}`}
                aria-label="Filtros"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* neighborhood chips */}
            <div className="-mx-5 mt-4 overflow-x-auto">
              <div className="flex gap-2 px-5">
                {NEIGHBORHOODS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setHood(n)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition hover:bg-primary/10 hover:text-primary ${
                      hood === n ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <FilterRow label="Tipo" options={[
                  { v: "todos", l: "Todos" }, { v: "cafe", l: "Cafeterías" }, { v: "coworking", l: "Coworkings" },
                ]} value={type} onChange={(v) => setType(v as any)} />
                <FilterRow label="Precio" options={[
                  { v: "todos", l: "Todos" }, { v: "$", l: "$" }, { v: "$$", l: "$$" }, { v: "$$$", l: "$$$" },
                ]} value={price} onChange={(v) => setPrice(v as any)} />
                <FilterRow label="Wifi" options={[
                  { v: "todas", l: "Todas" }, { v: "excelente", l: "Excelente" }, { v: "buena", l: "Buena" },
                ]} value={wifi} onChange={(v) => setWifi(v as any)} />
                <button
                  onClick={() => { setType("todos"); setPrice("todos"); setWifi("todas"); setHood("Todos"); setQ(""); }}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" /> Limpiar filtros
                </button>
              </div>
            )}
          </header>

          <div className={`md:block md:flex-1 md:overflow-y-auto ${view === "map" ? "hidden" : "block"}`}>
            <section className="space-y-4 px-5 pb-8 pt-2 md:pb-12">
              <p className="text-xs text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "lugar" : "lugares"} en tu zona
              </p>
              {filtered.map((p) => <PlaceCard key={p.id} place={p} />)}
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No encontramos spots con esos filtros.
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Right Col: Map */}
        <div className={`md:block md:w-1/2 lg:w-[55%] md:relative ${view === "list" ? "hidden" : "block"}`}>
          <section className="px-5 md:h-full md:px-0">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary md:h-full md:rounded-none md:border-none">
              <img src={mapImg} alt="Mapa de CABA" className="h-[52vh] w-full object-cover opacity-90 md:h-full" />
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to="/place/$id"
                  params={{ id: p.id }}
                  className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 md:z-10"
                  style={{ left: `${p.pin.x}%`, top: `${p.pin.y}%` }}
                >
                  <div className="flex flex-col items-center group">
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-md group-hover:bg-foreground">
                      {p.price}
                    </span>
                    <span className="mt-[-2px] h-2 w-2 rotate-45 bg-primary group-hover:bg-foreground" />
                    <span className="mt-1 hidden rounded bg-background px-2 py-0.5 text-xs font-semibold shadow-sm md:group-hover:block">
                      {p.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">
              {filtered.length} spots visibles · tocá un pin para ver detalle
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function FilterRow({ label, options, value, onChange }: {
  label: string;
  options: { v: string; l: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              value === o.v ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
