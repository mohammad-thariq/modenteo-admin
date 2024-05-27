export const TruncateString = (txt) => {
  const n = txt?.substring(0, 20);
  const d = txt?.substring(0, 20) + "...";
  return txt?.length >= 21 ? d : n;
};
