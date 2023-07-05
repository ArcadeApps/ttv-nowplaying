import type { TokenResponse } from "./TokenResponse";

export interface AppState {
    authState: TokenResponse;
    overrides: {
        font_size: number;
        font_family: string;
        darkMode: boolean;
        wordWrap: boolean;
        upperCase: boolean;
    }
}