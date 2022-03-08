const capitalize = (string: string): string => {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
};

export default capitalize;
