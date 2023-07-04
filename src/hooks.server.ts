import { SvelteKitAuth } from "@auth/sveltekit";
import type { SvelteKitAuthConfig } from "@auth/sveltekit";
import SpotifyProvider from "@auth/core/providers/spotify";
import type { Provider } from "@auth/core/providers";
import type { Handle } from "@sveltejs/kit";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SECRET_KEY } from "$env/static/private";

const config: SvelteKitAuthConfig = {
    providers: [SpotifyProvider({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
        authorization: "https://accounts.spotify.com/authorize?scope=user-read-playback-state,user-read-currently-playing,user-read-email"
    }) as Provider], //not the best but @auth is broken rn with the typing
    secret: SECRET_KEY,
    debug: false,
    session: {
        maxAge: 1800,
        strategy: 'jwt'
    },
    callbacks: {
        async session({ session, token, user }) {
            if (session.user) session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    }
};
export const handle = SvelteKitAuth(config) satisfies Handle;