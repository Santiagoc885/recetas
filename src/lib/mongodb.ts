import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// En desarrollo, Next.js recarga módulos en caliente; sin esta cache global
// cada recarga abriría una nueva conexión a MongoDB. Se reutiliza la promesa
// de conexión a través de `global` para evitar ese problema.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cache;

// Conecta (o reutiliza la conexión existente) a MongoDB.
// Retorna la instancia de mongoose ya conectada.
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("Falta la variable de entorno MONGODB_URI");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    // Si la conexión falla, se limpia la promesa cacheada para que el
    // próximo request pueda reintentar en vez de repetir el mismo error.
    cache.promise = mongoose.connect(MONGODB_URI).catch((error) => {
      cache.promise = null;
      throw error;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
