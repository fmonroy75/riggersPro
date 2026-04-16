# Rigger Pro

Aplicacion web desarrollada con Vue 3 y Vite para reunir calculadoras utiles en operaciones de izaje y rigging. El proyecto esta pensado para ejecutarse tambien como PWA, de modo que pueda instalarse en movil o escritorio y usarse rapidamente en campo.

## Funcionalidades

- Inicio con acceso rapido a calculadoras de rigging.
- Navegacion movil fija para `Home`, `Install` y `Stats`.
- Pantalla de instalacion para uso como app en Android, iPhone/iPad y computador.
- Registro de service worker para soporte PWA/offline.
- Interfaz construida con Vue 3, Vue Router y Vuetify.

## Calculadoras incluidas

- Sling Tension
- Angle Factor
- Load Weight
- Center Gravity
- Crane Moment
- Shackle Safety
- Multi Leg Sling
- Load Distribution
- Wind Load
- Hook Load
- Safety Factor
- Lift Planning

## Stack

- `Vue 3`
- `Vite`
- `Vue Router`
- `Vuetify`
- `Vuex`
- `@vueuse/motion`
- `vite-plugin-pwa`
- `Chart.js`
- `Firebase`

## Requisitos

- `Node.js` 18 o superior recomendado
- `npm`

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La app quedara disponible en la URL local que muestre Vite en consola.

## Build de produccion

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Variables de entorno

El proyecto incluye un archivo `.env.example` con las variables esperadas:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_DEEPSEEK_API_KEY=
```

Puedes copiar `.env.example` a `.env` y completar los valores necesarios segun tu entorno.

## Estructura principal

```text
src/
  assets/icons/              # iconos de calculadoras
  components/
    calculators/             # calculadoras individuales
    MobileNav.vue            # navegacion inferior
  router/index.js            # rutas de la aplicacion
  views/
    Home.vue                 # menu principal
    InstallApp.vue           # instrucciones de instalacion
```

## Objetivo del proyecto

Centralizar herramientas practicas para personal de rigging, facilitando calculos frecuentes desde una interfaz rapida, simple y accesible desde celular o escritorio.
