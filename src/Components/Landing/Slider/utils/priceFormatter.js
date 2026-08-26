export default function priceFormatter(price) {
  return (
    Math.floor(price * 50000)
      .toLocaleString("fa-IR") + " تومان"
  );
}