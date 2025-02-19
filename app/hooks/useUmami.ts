import { useEffect, useState } from "react";
import { validateUmamiEnv } from "../utils/env-validation";
import { getUmamiConfig } from "../utils/umami";

export const useUmami = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      validateUmamiEnv();

      const domain = window.location.hostname;
      const config = getUmamiConfig(domain);

      if (config) {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.setAttribute("data-website-id", config.websiteId);
        script.src = config.scriptUrl;

        document.head.appendChild(script);

        if (process.env.NODE_ENV === "development") {
          console.log(`Umami analytics initialized for domain: ${domain}`);
        }

        return () => {
          document.head.removeChild(script);
        };
      } else if (process.env.NODE_ENV === "development") {
        console.log(`No Umami configuration found for domain: ${domain}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      if (process.env.NODE_ENV === "development") {
        console.error("Umami configuration error:", err);
      }
    }
  }, []);

  return { error };
};
