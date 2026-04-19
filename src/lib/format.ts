const ronNumberFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return `${ronNumberFormatter.format(price)} lei`;
}
