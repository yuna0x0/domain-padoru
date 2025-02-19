import { headers } from "next/headers";
import { getUmamiConfig } from "../utils/umami";

export const runtime = "edge";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const config = getUmamiConfig(host);

  if (!config) {
    // Return empty JavaScript when no configuration matches
    return new Response("", {
      headers: {
        "Content-Type": "application/javascript",
      },
    });
  }

  // Generate JavaScript that creates and injects the script
  const scriptContent = `
    (function() {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = "${process.env.UMAMI_SCRIPT_URL}";
      script.setAttribute("data-website-id", "${config.websiteId}");
      document.head.appendChild(script);
    })();
  `.trim();

  return new Response(scriptContent, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
