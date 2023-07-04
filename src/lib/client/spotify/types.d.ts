interface Track {
    id: string;
    name: string;
    artists: Artist[];
    images: Image[];
}
interface Artist {
    id: string;
    name: string;
    href: string;
}
interface Image {
    url: string;
    width: number;
    height: number;
}