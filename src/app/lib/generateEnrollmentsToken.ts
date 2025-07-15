export const generateToken = () => {
  const prefix = "SC";
  const typeChar = "M";
  const number = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  const suffixChar = String.fromCharCode(64 + Math.floor(Math.random() * 26));

  return `${prefix}-${typeChar}${number}${suffixChar}`;
};
