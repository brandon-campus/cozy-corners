import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, TicketPercent } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getPlace } from "@/lib/mock-places";
import { useState } from "react";

export const Route = createFileRoute("/coupon/$id")({
  component: Coupon,
  loader: ({ params }) => {
    const place = getPlace(params.id);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Cupón · ${loaderData?.place.name ?? ""} · WorkSpot` },
      { name: "description", content: "Cupón de descuento para usar en el local." },
    ],
  }),
});

function Coupon() {
  const { place } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    `WORKSPOT:${place.couponCode}`
  )}&size=360x360&margin=0&bgcolor=fbf6ec&color=2b1d10`;

  return (
    <AppShell hideNav>
      <div className="min-h-screen bg-gradient-to-b from-primary/12 via-background to-background">
        <header className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+16px)]">
          <Link to="/place/$id" params={{ id: place.id }} className="grid h-10 w-10 place-items-center rounded-full bg-background shadow-sm" aria-label="Volver">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Cupón WorkSpot</p>
          <div className="h-10 w-10" />
        </header>

        <div className="px-5 pt-4">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/10">
            {/* header */}
            <div className="bg-primary/8 px-6 pb-5 pt-6 text-center">
              <div className="mx-auto inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                <TicketPercent className="h-3.5 w-3.5" /> Descuento activo
              </div>
              <h1 className="mt-3 font-display text-2xl font-bold leading-tight">{place.name}</h1>
              <p className="text-xs text-muted-foreground">{place.neighborhood}</p>
              <p className="mt-4 font-display text-[1.15rem] leading-snug text-foreground">
                {place.discount}
              </p>
            </div>

            {/* ticket cut */}
            <div className="relative">
              <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
              <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
              <div className="mx-6 border-t border-dashed border-border" />
            </div>

            {/* qr */}
            <div className="px-6 pb-6 pt-6 text-center">
              <div className="mx-auto grid aspect-square w-52 place-items-center rounded-2xl border border-border bg-[#fbf6ec] p-3">
                <img src={qrUrl} alt="Código QR del cupón" className="h-full w-full object-contain" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                O ingresá el código
              </p>
              <button
                onClick={async () => {
                  await navigator.clipboard?.writeText(place.couponCode).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="mx-auto mt-2 flex items-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 px-5 py-2.5 font-mono text-lg font-bold tracking-widest text-primary"
              >
                {place.couponCode}
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Mostrá este código en la caja al momento de pagar.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-secondary/70 p-4 text-xs leading-relaxed text-secondary-foreground">
            <p className="font-semibold">Condiciones</p>
            <p className="mt-1 text-muted-foreground">
              Válido por única vez, por persona. No acumulable con otras promociones.
              Presentá el QR o el código en el local antes de pedir.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
