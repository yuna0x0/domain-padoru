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
    const ids = process.env.NEXT_PUBLIC_UMAMI_IDS!;
    const domains = process.env.NEXT_PUBLIC_UMAMI_DOMAINS!;

    const idList = ids.split(",").map((id) => id.trim());
    const domainList = domains.split(",").map((domain) => domain.trim());

    return idList.map((websiteId, index) => ({
      websiteId,
      scriptUrl,
      domains: [domainList[index]],
    }));
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
    configs.find((config) => config.domains.some((d) => domain.includes(d))) ||
    null
  );
};
