export const snakeToTitle = (text: string): string => {
  // Check if text is a string
  if (typeof text !== 'string') {
    return ''; // Or handle the error accordingly
  }

  return text
    .replace(/(^\w)/g, (g) => g[0].toUpperCase())
    .replace(/([-_]\w)/g, (g) => ` ${g[1].toUpperCase()}`)
    .trim();
};
