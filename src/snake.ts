// Turn a name in any of the usual shapes into snake_case.

/**
 * Insert `_` before every upper-case letter that follows a lower-case letter or
 * digit, collapse every run of hyphens or whitespace into one `_`, lower-case
 * the whole and trim `_` from both ends. `'helloWorld'` → `'hello_world'`,
 * `'kebab-case-in'` → `'kebab_case_in'`, `'already_snake'` → `'already_snake'`.
 */
export const snakeCase = (text: string): string =>
  text
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
