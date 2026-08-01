# Cozy Corners

Quiero que diseñes el prototipo de interfaz completo de una app web mobile-first llamada "WorkSpot" (nombre provisorio, si tenés una idea mejor de nombre podés sugerirla).

Contexto del producto: WorkSpot ayuda a freelancers, emprendedores y gente que trabaja en remoto a encontrar cafeterías y espacios de coworking donde puedan ser productivos, en Ciudad Autónoma de Buenos Aires (CABA). El problema que resuelve: mucha gente pierde productividad trabajando desde su casa por estar demasiado cómoda, pero no conoce lugares cercanos con buen wifi, buena carta y buen ambiente para ir a trabajar, y termina sin animarse a probar lugares nuevos por falta de información.

Estilo visual:

Cálido pero moderno: que combine la sensación acogedora de una cafetería con una estética tech/productiva, no clínica ni corporativa fría.

Paleta con tonos tierra/café (crema, marrón tostado, terracota) combinados con un color de acento vibrante para CTAs (por ejemplo un verde o naranja).

Tipografía clara y legible, con jerarquía visual fuerte.

Mobile-first, cards con buen uso de espacio en blanco, iconografía simple y consistente.

Pantallas a diseñar (con datos de ejemplo, sin backend real):

Onboarding / Landing: propuesta de valor en 2-3 slides o una sola pantalla — "Encontrá tu lugar ideal para trabajar en CABA: wifi, precios y ambiente, todo en un solo lugar". Botón para explorar.

Explorar (Home):

Mapa de CABA con pines de cafeterías/coworkings (podés simularlo con una imagen de mapa o un mapa básico).

Debajo o en toggle, lista de lugares en formato card: foto, nombre, tipo (cafetería/coworking), rango de precio (// /$/$$$), badge de calidad de wifi (ej: "Wifi excelente"), distancia.

Filtros arriba: tipo de lugar, rango de precio, calidad de wifi, zona/barrio.

Buscador.

Detalle del lugar:

Galería de fotos.

Nombre, barrio, horarios de apertura.

Datos clave para trabajar: velocidad/calidad de wifi, disponibilidad de enchufes, nivel de ruido/ambiente (tranquilo/animado), si tiene mesas grandes.

Precios de referencia (ej: "Café desde $X", "Menú del día $X").

Carta o productos destacados.

Reseña curada corta (como si la hubiera escrito el equipo de WorkSpot, no reviews de usuarios).

Botón destacado "Ver cupón de descuento".

Cupón / QR:

Pantalla simple mostrando un código QR de ejemplo y un código alfanumérico para mostrar en el local.

Texto tipo "Mostrá este código en la caja y obtené tu descuento".

Detalle de qué descuento aplica.

Guardados / Favoritos: lista de lugares que el usuario marcó con el ícono de corazón/guardar, mismo formato de card que en Explorar.

Perfil: pantalla simple con nombre de usuario, lugares visitados/guardados, y opción de cerrar sesión. Nada complejo.

Importante:

No implementes lógica de backend, autenticación real, ni base de datos — todo con datos de ejemplo (mock data) hardcodeados en el frontend.

Priorizá que se vea pulido y usable como prototipo para mostrar a usuarios reales y validar la idea, no una app funcional completa.

Usá contenido de ejemplo realista para cafeterías y coworkings de Buenos Aires (nombres, barrios como Palermo, Recoleta, San Telmo, Belgrano, etc.).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2033554c-2eb1-452a-9e7b-82bded9b3151).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
