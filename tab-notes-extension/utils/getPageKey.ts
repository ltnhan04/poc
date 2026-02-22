export const getPageKey = (url: string) => {
  const urlObj = new URL(url);
  return `${urlObj.hostname}${urlObj.pathname}`;
};
