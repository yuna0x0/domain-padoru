export interface UmamiSite {
  domain: string;
  websiteId: string;
}

export const parseUmamiConfig = (): UmamiSite[] => {
  const scriptUrl = process.env.UMAMI_SCRIPT_URL;
  const sitesString = process.env.UMAMI_SITES;

  if (!scriptUrl || !sitesString) {
    if (process.env.NODE_ENV === "development") {
      console.log("Umami analytics is disabled (missing configuration)");
    }
    return [];
  }

  try {
    return sitesString.split(",").map((siteString) => {
      const [domain, websiteId] = siteString.trim().split(":");
      if (!domain || !websiteId) {
        throw new Error(`Invalid site configuration: ${siteString}`);
      }
      return { domain, websiteId };
    });
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
