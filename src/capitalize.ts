// Upper-case the first character of a name, leaving the rest as it was.

/**
 * `charAt(0)` is the empty string on an empty input, so `''` comes back `''`
 * rather than throwing, and `slice(1)` returns everything after the first
 * character untouched — `'aDA'` stays `'ADA'`, never lower-cased. A leading
 * space is itself the first character and upper-cases to a space, so `'  ada'`
 * survives whole; nothing here trims.
 */
export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1)
