export const getTitleFromPath = (path) => {
  path = path.replace(/^\/+|\/+$/g, "");
  if (path === "" || path === "/") {
    return "Dashboard";
  }
  const parts = path.split("/");
  const lastPart = parts[parts.length - 1];
  const formattedTitle = lastPart
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return formattedTitle;
};
