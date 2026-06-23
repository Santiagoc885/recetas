import { v2 as cloudinary } from "cloudinary";

// La configuración se aplica recién al subir una imagen (no al importar el
// módulo), para que siempre lea las variables de entorno ya cargadas
// (en el seed script, dotenv las carga después de que se resuelven los
// imports).
function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Responsabilidad: alojar las imágenes de las recetas en Cloudinary en vez
// de enlazar directamente a una URL externa (evita que la app se rompa si
// la fuente original cae o cambia).
//
// Métodos disponibles:
// - uploadImageFromUrl: descarga una imagen desde una URL y la sube a
//   Cloudinary, devolviendo la URL segura ya alojada en nuestra cuenta.

// Sube una imagen remota a la carpeta "recetas" de Cloudinary.
// `publicId` identifica el archivo (ej. el slug de la receta) para que
// volver a correr el seed sobrescriba la misma imagen en vez de duplicarla.
export async function uploadImageFromUrl(
  imageUrl: string,
  publicId: string
): Promise<string> {
  configureCloudinary();

  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "recetas",
    public_id: publicId,
    overwrite: true,
  });

  return result.secure_url;
}
