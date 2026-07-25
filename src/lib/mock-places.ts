import place1 from "@/assets/place-1.jpg";
import place2 from "@/assets/place-2.jpg";
import place3 from "@/assets/place-3.jpg";
import place4 from "@/assets/place-4.jpg";

export type PlaceType = "cafe" | "coworking";
export type WifiQuality = "excelente" | "buena" | "regular";
export type Noise = "tranquilo" | "moderado" | "animado";

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  neighborhood: string;
  price: "$" | "$$" | "$$$";
  wifi: WifiQuality;
  wifiSpeed: string;
  distanceKm: number;
  hours: string;
  outlets: "muchos" | "algunos" | "pocos";
  noise: Noise;
  bigTables: boolean;
  photo: string;
  gallery: string[];
  priceRefs: { label: string; price: string }[];
  highlights: { name: string; note: string }[];
  curatedReview: string;
  discount: string;
  couponCode: string;
  // pin position on stylized map (percent)
  pin: { x: number; y: number };
}

export const PLACES: Place[] = [
  {
    id: "lattente-palermo",
    name: "LAB Tostadores",
    type: "cafe",
    neighborhood: "Palermo",
    price: "$$",
    wifi: "excelente",
    wifiSpeed: "120 Mbps",
    distanceKm: 0.6,
    hours: "Lun a Dom · 8:00 – 20:00",
    outlets: "muchos",
    noise: "moderado",
    bigTables: true,
    photo: place1,
    gallery: [place1, place4, place3],
    priceRefs: [
      { label: "Café de especialidad", price: "$2.800" },
      { label: "Flat white", price: "$3.400" },
      { label: "Tostado + café", price: "$6.900" },
    ],
    highlights: [
      { name: "V60 filtrado", note: "Grano rotativo, notas cítricas" },
      { name: "Cold brew", price: "", note: "En botella, todo el día" } as unknown as { name: string; note: string },
      { name: "Banana bread", note: "De la casa, sin gluten" },
    ],
    curatedReview:
      "Uno de los tostadores más serios de Palermo. Mesa larga al fondo pensada para laptop, enchufes en cada silla y baristas que no te apuran. Ideal para jornadas de 4+ horas.",
    discount: "15% off en tu primer café + medialuna gratis",
    couponCode: "WSPOT-LAB15",
    pin: { x: 34, y: 38 },
  },
  {
    id: "urban-station-belgrano",
    name: "Urban Station",
    type: "coworking",
    neighborhood: "Belgrano",
    price: "$$$",
    wifi: "excelente",
    wifiSpeed: "300 Mbps · fibra",
    distanceKm: 2.1,
    hours: "Lun a Vie · 8:30 – 21:00",
    outlets: "muchos",
    noise: "tranquilo",
    bigTables: true,
    photo: place2,
    gallery: [place2, place4, place1],
    priceRefs: [
      { label: "Pase por día", price: "$14.500" },
      { label: "Pase 10 días", price: "$118.000" },
      { label: "Café ilimitado", price: "Incluido" },
    ],
    highlights: [
      { name: "Cabinas para llamadas", note: "Reservables por hora" },
      { name: "Sala de reuniones", note: "Hasta 6 personas" },
      { name: "Terraza al aire libre", note: "Wifi extendido" },
    ],
    curatedReview:
      "El clásico coworking porteño. Silencio de biblioteca, sillas ergonómicas y café de filtro ilimitado. Si tenés un día de deep work o llamadas seguidas, es acá.",
    discount: "Primer día gratis con este cupón",
    couponCode: "WSPOT-URBAN01",
    pin: { x: 58, y: 22 },
  },
  {
    id: "fuegia-sanTelmo",
    name: "Fuegia Café",
    type: "cafe",
    neighborhood: "San Telmo",
    price: "$",
    wifi: "buena",
    wifiSpeed: "60 Mbps",
    distanceKm: 3.4,
    hours: "Mar a Dom · 9:00 – 19:00",
    outlets: "algunos",
    noise: "tranquilo",
    bigTables: false,
    photo: place3,
    gallery: [place3, place1, place4],
    priceRefs: [
      { label: "Café doble", price: "$1.900" },
      { label: "Medialuna", price: "$1.200" },
      { label: "Sandwich del día", price: "$5.400" },
    ],
    highlights: [
      { name: "Pastelería propia", note: "Recomendado el alfajor de maicena" },
      { name: "Café de olla", note: "Especialidad de la casa" },
      { name: "Patio interno", note: "Perfecto para leer" },
    ],
    curatedReview:
      "Un rincón calmo de San Telmo. Mesas chicas, azulejos originales y clientela habitué. Buenísimo para media jornada de trabajo enfocado antes de salir a caminar.",
    discount: "2x1 en café + medialuna, todos los días hasta las 11hs",
    couponCode: "WSPOT-FUEGIA2X1",
    pin: { x: 55, y: 74 },
  },
  {
    id: "bianca-recoleta",
    name: "Bianca Bistró",
    type: "cafe",
    neighborhood: "Recoleta",
    price: "$$",
    wifi: "buena",
    wifiSpeed: "80 Mbps",
    distanceKm: 1.4,
    hours: "Lun a Dom · 8:00 – 22:00",
    outlets: "algunos",
    noise: "animado",
    bigTables: true,
    photo: place4,
    gallery: [place4, place1, place2],
    priceRefs: [
      { label: "Café + tostado", price: "$5.900" },
      { label: "Menú del día", price: "$12.500" },
      { label: "Copa de vino", price: "$4.800" },
    ],
    highlights: [
      { name: "Menú ejecutivo", note: "12 a 15hs, entrada + principal + café" },
      { name: "Brunch fin de semana", note: "Hasta las 15hs" },
      { name: "Ventanales", note: "Luz natural todo el día" },
    ],
    curatedReview:
      "Elegante y muy luminoso. Se llena a la hora del almuerzo, pero de 15 a 19 queda ideal para trabajar. Ambiente animado pero no ruidoso — mejor con auriculares.",
    discount: "10% off en el menú del día",
    couponCode: "WSPOT-BIANCA10",
    pin: { x: 48, y: 30 },
  },
  {
    id: "coffeetown-palermo",
    name: "Coffee Town",
    type: "cafe",
    neighborhood: "Palermo Soho",
    price: "$$",
    wifi: "excelente",
    wifiSpeed: "150 Mbps",
    distanceKm: 0.9,
    hours: "Lun a Dom · 8:00 – 21:00",
    outlets: "muchos",
    noise: "moderado",
    bigTables: true,
    photo: place1,
    gallery: [place1, place2, place3],
    priceRefs: [
      { label: "Espresso", price: "$2.200" },
      { label: "Cappuccino", price: "$3.100" },
      { label: "Avocado toast", price: "$7.400" },
    ],
    highlights: [
      { name: "Barra alta con enchufes", note: "8 asientos" },
      { name: "Opciones veggie", note: "Menú marcado con V" },
      { name: "Música baja", note: "Playlist propia de jazz" },
    ],
    curatedReview:
      "Ambiente clásico de café de especialidad porteño. La barra alta contra la ventana es el mejor puesto: enchufe, luz y vista a la calle. Precio justo por lo que ofrece.",
    discount: "Café de filtro gratis con la compra de cualquier tostado",
    couponCode: "WSPOT-COFFTOWN",
    pin: { x: 30, y: 46 },
  },
  {
    id: "workin-belgrano",
    name: "Work'in Belgrano",
    type: "coworking",
    neighborhood: "Belgrano",
    price: "$$",
    wifi: "excelente",
    wifiSpeed: "200 Mbps",
    distanceKm: 2.7,
    hours: "Lun a Sab · 8:00 – 22:00",
    outlets: "muchos",
    noise: "tranquilo",
    bigTables: true,
    photo: place2,
    gallery: [place2, place1, place4],
    priceRefs: [
      { label: "Pase por día", price: "$9.800" },
      { label: "Pase por hora", price: "$2.400" },
      { label: "Sala privada", price: "Desde $18.000" },
    ],
    highlights: [
      { name: "Zona silenciosa", note: "Piso completo sin llamadas" },
      { name: "Café + snacks", note: "Incluidos en el pase" },
      { name: "Impresora", note: "Uso libre" },
    ],
    curatedReview:
      "Coworking accesible y muy prolijo. El pase por hora lo hace ideal para escapadas cortas. Zona de Belgrano C, a 5 min de la estación.",
    discount: "50% off en tu primer pase por día",
    couponCode: "WSPOT-WORKIN50",
    pin: { x: 62, y: 26 },
  },
];

export const getPlace = (id: string) => PLACES.find((p) => p.id === id);

export const NEIGHBORHOODS = ["Todos", "Palermo", "Palermo Soho", "Recoleta", "San Telmo", "Belgrano"];
