export const ucwords = (text: string) => {
  return text.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
};

export const toCamelCase = (text: string) => {
  return text.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};

export const toKebabCase = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toSnakeCase = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

export const toPascalCase = (text: string) => {
  return text
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^(.)/, (_, char) => char.toUpperCase());
};

export const toLowerCase = (text: string) => {
  return text.toLowerCase();
};

export const toUpperCase = (text: string) => {
  return text.toUpperCase();
};
