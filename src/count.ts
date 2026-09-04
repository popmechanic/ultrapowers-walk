// Count the words in a string.

/**
 * Count maximal runs of non-whitespace characters. Any whitespace — spaces,
 * tabs, newlines, runs of them — separates words, so `'a  b c'` → `3` and a
 * string with nothing but whitespace → `0`.
 */
export const wordCount = (text: string): number => (text.match(/\S+/g) ?? []).length
