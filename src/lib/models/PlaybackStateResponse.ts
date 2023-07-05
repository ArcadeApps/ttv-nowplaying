import type { SpotifyResponse } from "./SpotifyResponse";

export interface PlaybackStateResponse extends SpotifyResponse{
	item: PlaybackState;
	is_playing: boolean;
}
export interface PlaybackState {
	name: string;
	artists: PlaybackStateArtists[];
	album: SpotifyAlbum;
}
export interface PlaybackStateArtists {
	name: string;
}

export interface SpotifyAlbum {
	images: SpotifyImage[];
}

export interface SpotifyImage {
	width: number;
	height: number;
	url: string;
}
