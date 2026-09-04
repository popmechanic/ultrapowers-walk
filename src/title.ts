// Title-case a piece of text, one word at a time.

/**
 * Upper-case the first character of every whitespace-separated word and
 * lower-case the rest, keeping the separators exactly as they were.
 * `'hello wORLD'` → `'Hello World'`.
 */
export const titleCase = (text: string): string =>
  text
    .split(/(\s+)/)
    .map((part) =>
      /^\s/.test(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join('')
