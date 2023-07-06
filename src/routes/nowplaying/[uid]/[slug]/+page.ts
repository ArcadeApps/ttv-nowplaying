import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;
export const load = (({ params }) => {
    if (!params.uid)
        throw error(400, 'Missing UID');
    if (!params.slug)
        throw error(404, 'Not Found');
    return {
        uid: params.uid,
        pageId: params.slug
    }
}) satisfies PageLoad;