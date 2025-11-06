export const RegexConst = Object.freeze({
  // For Format
  stringArgFormat: /(?:{{)|(?:}})/g,
  stringArg: /((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g,
  stringFormat: /^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/
});
