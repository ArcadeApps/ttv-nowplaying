import type { SpotifyResponse } from "./SpotifyResponse";

export interface TokenResponse extends SpotifyResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
