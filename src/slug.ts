// Turn a title into a URL slug — the seed module this repository grows from.

/**
 * Lower-case the text, replace every run of non-alphanumeric characters with
 * one hyphen, and trim hyphens from both ends. `'Hello,  World!'` → `'hello-world'`.
 */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
