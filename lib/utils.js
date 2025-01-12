export function extractFirstImagefromMarkdown(markdownText) {
  const imagePattern = /!\[.*?\]\((.*?)\)/;
  const match = markdownText.match(imagePattern);
  if (match) {
    return match[1];
  }
  return null;
}

export function formatDate(stringDate) {
  const formattedDate = new Date(stringDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}
