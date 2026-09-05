// Turn a mixed-case, snake or spaced name into kebab-case.

/**
 * Mark a word boundary before every upper-case letter that follows a lower-case
 * letter or a digit — `'helloWorld'` → `'hello-World'`, while a leading capital
 * starts no new word. Every run of underscores or whitespace collapses to a
 * single `-`, so `'snake_case_in'` and `'two  words'` both come out
 * single-hyphenated. Lower-casing last leaves the result all lower-case, and
 * trimming strips the `-` a leading or trailing separator would otherwise leave
 * behind.
 */
export const kebabCase = (text: string): string =>
  text
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
