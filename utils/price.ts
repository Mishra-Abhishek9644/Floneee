export function calculateFinalPrice(
  price: number,
  discount: number = 0
) {
  if (!discount || discount <= 0) return price;
  return Math.round(price - (price * discount) / 100);
}
