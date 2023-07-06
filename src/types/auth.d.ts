import type { DefaultSession } from "@auth/core/types";
import type { JWT } from "@auth/core/jwt";

declare module "../../node_modules/.pnpm/@auth+core@0.9.0/node_modules/@auth/core/types" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession['user'];
    accessToken: string | undefined;
  }
}
declare module "../../node_modules/.pnpm/@auth+core@0.9.0/node_modules/@auth/core/jwt" {
  interface JWT {
    id: string;
    accessToken: string | undefined;
  }
}