<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<span>{data.uid}</span>
<br />
<span>{data.pageId}</span>
<br />