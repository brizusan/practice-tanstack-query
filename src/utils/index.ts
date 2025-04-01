export const formatCurrency = (currency: number) => {
  return currency.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
};
