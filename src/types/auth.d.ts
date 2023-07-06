import type { DefaultSession } from "@auth/core/types";
import type { JWT } from "@auth/core/jwt";

declare module "@auth/core/types" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession['user'];
    accessToken: string | undefined;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    accessToken: string | undefined;
  }
}