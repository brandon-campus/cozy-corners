import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wifi, Coffee, MapPin } from "lucide-react";
import hero from "@/assets/hero-cafe.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "WorkSpot — Encontrá dónde trabajar en CABA" },
      { name: "description", content: "Cafeterías y coworkings curados en Buenos Aires: wifi, precios y ambiente en un solo lugar." },
    ],
  }),
});

function Landing() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative h-[62vh] min-h-[440px] w-full overflow-hidden md:h-screen md:w-1/2">
        <img src={hero} alt="Café acogedor en Buenos Aires" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background md:bg-gradient-to-r md:from-transparent md:via-background/10 md:to-background" />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold backdrop-blur md:left-8 md:top-8">
          <Coffee className="h-3.5 w-3.5 text-primary" />
          WorkSpot · CABA
        </div>
      </div>

      <div className="-mt-16 flex flex-1 flex-col justify-center px-6 pb-10 md:mt-0 md:w-1/2 md:px-16 lg:px-24">
        <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          Encontrá tu lugar ideal para trabajar en <span className="text-primary">CABA</span>.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Wifi, precios y ambiente de cafeterías y coworkings porteños — todo en un solo lugar, curado por gente que también trabaja desde afuera de casa.
        </p>

        <ul className="mt-7 space-y-4 md:mt-10 md:space-y-6">
          <Feature icon={Wifi} title="Wifi verificado" desc="Velocidad y estabilidad reales, no promesas." />
          <Feature icon={MapPin} title="Cerca tuyo" desc="Mapa de CABA con spots por barrio." />
          <Feature icon={Coffee} title="Ambiente pensado para trabajar" desc="Enchufes, mesas grandes, nivel de ruido." />
        </ul>

        <div className="mt-auto pt-8 md:mt-10">
          <Link
            to="/explore"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:bg-primary/90 active:scale-[0.98] md:w-fit md:px-8"
          >
            Explorar spots
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground md:text-left">Sin registro. Sin fricción.</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: typeof Wifi; title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3 md:gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-primary md:h-12 md:w-12">
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-foreground md:text-lg">{title}</p>
        <p className="text-sm text-muted-foreground md:text-base">{desc}</p>
      </div>
    </li>
  );
}
