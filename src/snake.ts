// Turn a mixed-case, kebab or spaced name into snake_case.

/**
 * Mark a word boundary before every upper-case letter that follows a lower-case
 * letter or a digit — `'helloWorld'` → `'hello_World'`, while a leading capital
 * starts no new word. Every run of hyphens or whitespace collapses to a single
 * `_`, so `'kebab-case-in'` and `'two  words'` both come out single-underscored.
 * Lower-casing last leaves the result all lower-case, and trimming strips the
 * `_` a leading or trailing separator would otherwise leave behind.
 */
export const snakeCase = (text: string): string =>
  text
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
