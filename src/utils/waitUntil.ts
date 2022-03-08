const waitUntil = (timeout: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default waitUntil;
