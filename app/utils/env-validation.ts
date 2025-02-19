export const validateUmamiEnv = () => {
  if (!process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL) {
    return false;
  }

  const ids = process.env.NEXT_PUBLIC_UMAMI_IDS;
  const domains = process.env.NEXT_PUBLIC_UMAMI_DOMAINS;

  if (!ids || !domains) {
    return false;
  }

  const idList = ids.split(",").map((id) => id.trim());
  const domainList = domains.split(",").map((domain) => domain.trim());

  if (idList.length !== domainList.length) {
    throw new Error("Number of IDs and domains must match");
  }

  if (idList.length === 0) {
    return false;
  }

  return true;
};
