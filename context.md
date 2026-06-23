# PROMPT PARA CLAUDE - DESARROLLO COMPLETO DE PRUEBA TÉCNICA NEXT.JS

Actúa como un desarrollador Full Stack Senior especializado en Next.js, TypeScript, MongoDB, NextAuth, Material UI y aplicaciones web modernas.

Tu objetivo es desarrollar COMPLETAMENTE la prueba técnica descrita a continuación.

## CONTEXTO IMPORTANTE

Esta prueba será presentada por un desarrollador Junior.

Por lo tanto:

* La solución debe verse profesional.
* Debe cumplir el 100% de los requisitos.
* No debes aplicar sobreingeniería.
* No debes utilizar patrones avanzados innecesarios.
* No debes implementar arquitecturas empresariales complejas.
* No debes usar Clean Architecture, CQRS, Event Sourcing, DDD ni patrones avanzados.
* El código debe ser fácil de leer, entender y defender en una entrevista técnica.
* Prioriza claridad sobre sofisticación.
* Toda decisión técnica debe ser razonable para un perfil Junior-Intermedio.

---

# DOCUMENTO DE REFERENCIA

Analiza cuidadosamente la prueba técnica adjunta y utiliza todos los requisitos funcionales y técnicos definidos en ella.

## RESUMEN DE LA PRUEBA

### Aplicación de recetas de cocina

Debe incluir:

### Catálogo de recetas

Ruta:

```txt
/
```

Características:

* Listado de recetas.
* Componente reutilizable RecipeCard.
* Mostrar:

  * Imagen
  * Nombre
  * Tiempo de preparación
  * Dificultad
* Acceso público.

### Detalle de receta

Ruta dinámica:

```txt
/recipes/[id]
```

Mostrar:

* Imagen
* Nombre
* Tiempo
* Dificultad
* Ingredientes
* Pasos
* Porciones
* Información extendida

### Autenticación

Rutas:

```txt
/login
/register
```

Características:

* Registro de usuario.
* Inicio de sesión.
* Mostrar usuario autenticado en Navbar.
* Los usuarios no autenticados pueden navegar recetas.
* Los usuarios no autenticados NO pueden agregar favoritos.

### Favoritos

Cada RecipeCard debe permitir:

* Agregar favorito.
* Eliminar favorito.

Ruta protegida:

```txt
/favorites
```

Debe mostrar:

* Solo recetas favoritas del usuario autenticado.

### Correo electrónico

Al registrarse:

* Enviar automáticamente correo de bienvenida.

---

# TECNOLOGÍAS OBLIGATORIAS

## Framework

```txt
Next.js 15
App Router
TypeScript
```

## UI

```txt
Material UI (MUI)
```

## Base de datos

```txt
MongoDB
Mongoose
```

## Autenticación

Utiliza:

```txt
NextAuth v5
Credentials Provider
bcrypt
```

No implementes JWT manualmente.

## Correo electrónico

Utiliza:

```txt
Nodemailer
```

Variables:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

---

# ARQUITECTURA REQUERIDA

Toda interacción con la base de datos debe pasar por una capa de servicios.

NO acceder a MongoDB directamente desde:

* Pages
* Components
* Server Actions
* Route Handlers

Toda la lógica debe pasar por:

```txt
src/services
```

Ejemplo:

```txt
src/
├── app/
├── components/
├── services/
├── models/
├── lib/
├── hooks/
├── types/
├── utils/
└── middleware/
```

---

# BASE DE DATOS

Colección users

Campos:

```ts
{
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
```

Colección recipes

Campos:

```ts
{
  title: string;
  image: string;
  difficulty: string;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  description: string;
}
```

Colección favorites

Campos:

```ts
{
  userId: ObjectId;
  recipeId: ObjectId;
  createdAt: Date;
}
```

---

# DATOS INICIALES

Genera un script seed.

Debe crear:

* 10 recetas completas.
* Datos realistas.
* Diferentes niveles:

  * Fácil
  * Intermedio
  * Difícil

Cada receta debe incluir:

* Imagen
* Ingredientes
* Instrucciones
* Tiempo
* Porciones

---

# EXPERIENCIA DE USUARIO

Diseño moderno.

Debe incluir:

### Navbar

* Logo
* Usuario autenticado
* Login
* Register
* Favorites
* Logout

### Home

* Grid responsive
* RecipeCards elegantes

### Detalle

* Imagen grande
* Ingredientes
* Pasos
* Información organizada

### Favoritos

* Lista de recetas favoritas

### Login

* Formulario validado

### Registro

* Formulario validado

---

# COMENTARIOS OBLIGATORIOS

Agrega comentarios explicativos en:

## Componentes

Explica:

* Responsabilidad
* Props
* Comportamiento

## Hooks

Explica:

* Qué hacen
* Qué retornan

## Servicios

Explica:

* Responsabilidad
* Métodos disponibles

## Utilidades

Explica:

* Objetivo
* Uso esperado

## Funciones

Explica:

* Parámetros
* Retorno
* Flujo principal

NO comentar cada línea.

Comentar únicamente lógica importante.

---

# ESTRUCTURA DE RESPUESTA

## FASE 1

Antes de escribir código:

Analiza:

* Requisitos funcionales.
* Requisitos técnicos.
* Riesgos.
* Decisiones técnicas.

Explica la arquitectura elegida.

---

## FASE 2

Genera árbol completo del proyecto.

Ejemplo:

```txt
src/
├── app/
├── components/
├── services/
├── models/
├── hooks/
├── lib/
├── middleware/
├── types/
└── utils/
```

---

## FASE 3

Genera TODOS los archivos necesarios.

Incluye:

* package.json
* tsconfig.json
* next.config.ts
* middleware.ts
* auth.ts
* modelos
* servicios
* componentes
* layouts
* páginas
* hooks
* APIs
* seed
* utilidades

No omitas archivos importantes.

---

## FASE 4

Explica:

### Flujo de autenticación

* Registro
* Login
* Sesión
* Logout

### Flujo de favoritos

* Agregar
* Eliminar
* Consultar

### Flujo de recetas

* Listado
* Detalle

### Flujo de correo

* Registro
* Envío de bienvenida

---

## FASE 5

Genera instrucciones de instalación.

### Instalación

```bash
npm install
```

### Variables de entorno

```env
MONGODB_URI=
NEXTAUTH_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

### Seed

```bash
npm run seed
```

### Desarrollo

```bash
npm run dev
```

---

# CALIDAD ESPERADA

La solución debe:

* Aprobar la prueba técnica.
* Cumplir todos los requisitos.
* Verse profesional.
* Ser fácil de mantener.
* Ser fácil de defender en una entrevista.
* Tener una arquitectura simple y limpia.
* Seguir buenas prácticas modernas de Next.js 15.
* Utilizar App Router.
* Utilizar TypeScript.
* Utilizar Material UI.
* Utilizar MongoDB.
* Utilizar NextAuth v5.
* Utilizar Nodemailer.

No simplifiques requisitos.

No omitas código.

No entregues ejemplos parciales.

Genera una implementación completa lista para ejecutar.
