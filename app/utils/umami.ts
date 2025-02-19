import { UmamiDomainConfig } from "../types/umami";
import { validateUmamiEnv } from "./env-validation";

export const parseUmamiConfig = (): UmamiDomainConfig[] => {
  try {
    if (!validateUmamiEnv()) {
      if (process.env.NODE_ENV === "development") {
        console.log("Umami analytics is disabled (no configuration)");
      }
      return [];
    }

    const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL!;
    const sites = process.env.NEXT_PUBLIC_UMAMI_SITES!;

    return sites.split(",").map((site) => {
      const [domain, websiteId] = site.trim().split(":");
      return {
        websiteId,
        scriptUrl,
        domains: [domain],
      };
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Umami configuration error:", error);
    }
    return [];
  }
};

export const getUmamiConfig = (domain: string): UmamiDomainConfig | null => {
  const configs = parseUmamiConfig();
  return (
    configs.find((config) =>
      config.domains.some((d) => d.toLowerCase() === domain.toLowerCase()),
    ) || null
  );
};
