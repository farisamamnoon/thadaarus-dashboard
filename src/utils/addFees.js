export const addFees = (fees) => {
  let totalFees = 0;
  let totalDiscount = 0;
  fees.map((item) => {
    totalFees += item.amount || 0;
    totalDiscount += item.discount || 0;
  });
  return { totalFees, totalDiscount };
};
