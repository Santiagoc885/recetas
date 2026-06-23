import { handlers } from "@/auth";

// Route Handler que expone los endpoints de NextAuth (signin, signout,
// session, callback, etc.) bajo /api/auth/*.
export const { GET, POST } = handlers;
