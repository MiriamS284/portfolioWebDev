export function formatDate(dateString, lang = "de") {
  const locale = lang === "en" ? "en-US" : "de-DE";
  return new Date(dateString).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
