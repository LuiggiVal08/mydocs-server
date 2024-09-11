// import { NODE_ENV } from "@/config";
// import * as fs from "node:fs/promises";

// export default async (): Promise<{
//     templateHtml: string;
//     ssrManifest: string | undefined;
// }> => {
//     const isProduction = NODE_ENV === "production";
//     const templateHtml = isProduction
//         ? await fs.readFile("../dist/client/index.html", "utf-8")
//         : "";

//     const ssrManifest = isProduction
//         ? await fs.readFile("../dist/client/.vite/ssr-manifest.json", "utf-8")
//         : undefined;

//     return { templateHtml, ssrManifest };
// };
