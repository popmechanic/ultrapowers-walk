// Reduce a name to its initials.

/**
 * Take the first character of each whitespace-separated word, upper-cased, and
 * join them with nothing, so `'Ada Lovelace'` → `'AL'`. Matching runs of
 * non-whitespace rather than splitting means surrounding and repeated
 * whitespace contribute no empty word, and `''` → `''`.
 */
export const initials = (text: string): string =>
  (text.match(/\S+/g) ?? []).map((word) => word.slice(0, 1).toUpperCase()).join('')
