export const AUTO_CHAR = '@';

export function getLowestPopoverScrollPosition({
  elementTop,
  elementHeight,
  popoverHeight,
  scrollHeight,
}) {
  return elementTop + elementHeight + popoverHeight - scrollHeight;
}

export function getQueryFromInput(text) {
  const textParts = text.split(AUTO_CHAR);
  if (textParts.length < 2) {
    return null;
  }
  return textParts
    .slice(1, textParts.length)
    .join(AUTO_CHAR)
    .toLowerCase();
}

export function replaceQueryWithSelection(text, selection) {
  const textParts = text.split(AUTO_CHAR);
  if (textParts.length < 2) {
    return text;
  }
  return textParts[0] + selection;
}
