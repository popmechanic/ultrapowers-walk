// Upper-case the first character of a name, leaving the rest as it was.

/**
 * `charAt(0)` is the empty string on empty input, so `''` comes back `''`, and
 * `slice(1)` carries the remainder through untouched — `'aDA'` → `'ADA'`, never
 * lower-cased. A leading space is the first character and upper-cases to
 * itself, so `'  ada'` is unchanged rather than trimmed.
 */
export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1)
