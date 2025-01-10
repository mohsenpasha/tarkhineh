export default function calculateDiscount(originalPrice, discountPercentage) {
  if (!originalPrice || !discountPercentage) 
      return { finalPrice: originalPrice, discountAmount: 0 };

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return { finalPrice, discountAmount };
}