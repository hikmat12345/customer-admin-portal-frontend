export function truncateText(text: string, maxLength = 10) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}
