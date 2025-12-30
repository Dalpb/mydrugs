const EUR = 3929.74; // jeje
export const transformBTCtoEUR = (btc: number) => {
  return (btc * EUR).toFixed(2);
};
