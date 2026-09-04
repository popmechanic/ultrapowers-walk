// Put the words of a text back in the opposite order.

/**
 * Return the words of `text` in reverse order, joined by single spaces. A word
 * is a maximal run of non-whitespace characters, so surrounding and repeated
 * whitespace is normalised away: `reverseWords('  a   b ')` → `'b a'`. The word
 * order is reversed, never the characters within a word — `reverseWords('ab cd')`
 * → `'cd ab'`. A text with no words joins to `''`.
 */
export const reverseWords = (text: string): string => {
  const words = text.match(/\S+/g) ?? []
  return words.reverse().join(' ')
}
