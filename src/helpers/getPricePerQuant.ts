export const getPricePerQuant = (
  price: number,
  quantity: number,
  quantityUnits: string,
) => {
  return `${(price / quantity).toFixed(2)} / ${quantityUnits} `;
};
