export const waitUntil = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
