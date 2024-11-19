export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replaceAll("-", "/"); 
  return formattedDate;
}