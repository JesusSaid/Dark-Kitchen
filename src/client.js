import { createClient } from "@sanity/client";

export default createClient({
    projectId: "bgdxpj5s",
    dataset: "production",
    useCdn: true,
    apiVersion: '2021-03-25',
})