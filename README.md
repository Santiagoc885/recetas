# Recetas

Aplicación de recetas de cocina: catálogo público, detalle de receta,
autenticación, favoritos y correo de bienvenida al registrarse.

## Stack

- Next.js 16 (App Router) + TypeScript
- Material UI (MUI)
- MongoDB + Mongoose, detrás de una capa de servicios (`src/services`)
- NextAuth v5 (Credentials Provider + bcrypt)
- Nodemailer (correo de bienvenida vía Gmail)
- Cloudinary (alojamiento de las imágenes de las recetas del seed)

> **Nota:** el proyecto corre sobre Next.js 16, que renombró
> `middleware.ts` a `proxy.ts` (mismo propósito, ver `src/proxy.ts`). Si
> ves referencias a "middleware" en tutoriales de Next 15, es ese archivo.

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GMAIL_USER=
GMAIL_APP_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- `MONGODB_URI`: cadena de conexión de MongoDB (Atlas o local).
- `NEXTAUTH_SECRET`: genera uno con `openssl rand -base64 32`.
- `GMAIL_USER` / `GMAIL_APP_PASSWORD`: opcionales. `GMAIL_APP_PASSWORD` es
  una ["contraseña de aplicación"](https://myaccount.google.com/apppasswords)
  (requiere verificación en 2 pasos activada en la cuenta de Gmail), no la
  contraseña normal. Si no se configuran, el correo de bienvenida se omite
  (se loguea una advertencia) en vez de romper el registro.
- `CLOUDINARY_*`: credenciales de tu cuenta de Cloudinary, usadas solo por
  el script de seed para subir las imágenes de las recetas.

## Datos iniciales (seed)

Carga 10 recetas de ejemplo (fácil/intermedio/difícil) y sube sus
imágenes a Cloudinary:

```bash
npm run seed
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

| Ruta            | Descripción               | Auth |
| --------------- | -------------------------- | ---- |
| `/`              | Listado de recetas         | No   |
| `/recipes/[id]`  | Detalle de receta          | No   |
| `/login`         | Inicio de sesión           | No   |
| `/register`      | Registro de usuario        | No   |
| `/favorites`     | Recetas favoritas          | Sí   |

## Arquitectura

Toda interacción con MongoDB (y con servicios externos como Cloudinary o
Gmail) pasa por `src/services/`. Ninguna página, componente, Server Action
o Route Handler accede a Mongoose directamente.

```
src/
├── app/            # rutas, layouts y Server Actions (app/actions)
├── components/     # componentes de UI reutilizables
├── services/       # única capa que toca MongoDB / Cloudinary / Gmail
├── models/         # esquemas de Mongoose
├── hooks/          # hooks de cliente reutilizables
├── lib/            # conexión a MongoDB
├── types/          # tipos compartidos
├── utils/          # funciones puras de formato
├── auth.ts         # configuración de NextAuth
└── proxy.ts         # protección de /favorites (reemplaza a middleware.ts)
```

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run start    # servidor de producción
npm run lint     # ESLint
npm run seed     # carga de datos iniciales
```
