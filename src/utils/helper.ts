const EUR = 25171.01; // jeje
export const transformBTCtoEUR = (btc: number) => {
  return (btc * EUR).toFixed(2);
};
