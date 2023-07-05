import type { PageLoadEvent } from "./$types";

export function load({ data }: PageLoadEvent) {
    return data;
}
