export interface UmamiSite {
  domain: string;
  websiteId: string;
}

export const parseUmamiConfig = (): UmamiSite[] => {
  try {
    const sites = Object.entries(process.env)
      .filter(([key]) => key.startsWith("UMAMI_SITE_"))
      .map(([_, value]) => {
        if (!value) return null;

        const [domain, websiteId] = value.trim().split(":");
        if (!domain || !websiteId) {
          throw new Error(`Invalid site configuration: ${value}`);
        }
        return { domain, websiteId };
      })
      .filter((site): site is UmamiSite => site !== null);

    if (sites.length === 0 && process.env.NODE_ENV === "development") {
      console.log("Umami analytics is disabled (no configuration)");
    }

    return sites;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Umami configuration error:", error);
    }
    return [];
  }
};

export const getUmamiConfig = (domain: string): UmamiSite | null => {
  const sites = parseUmamiConfig();
  return sites.find((site) => domain.includes(site.domain)) || null;
};
