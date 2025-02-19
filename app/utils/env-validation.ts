export const validateUmamiEnv = () => {
  if (!process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL) {
    return false;
  }

  const sites = process.env.NEXT_PUBLIC_UMAMI_SITES;

  if (!sites) {
    return false;
  }

  const siteConfigs = sites.split(",").map((site) => site.trim());

  if (siteConfigs.length === 0) {
    return false;
  }

  // Validate format (domain:id)
  const isValidFormat = siteConfigs.every((site) => {
    const parts = site.split(":");
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
  });

  if (!isValidFormat) {
    throw new Error("Invalid site configuration format. Expected: domain:id");
  }

  return true;
};
