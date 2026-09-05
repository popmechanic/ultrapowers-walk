// Count the vowels in a piece of text.

/**
 * Count `a`, `e`, `i`, `o` and `u` with multiplicity, ignoring case. `y` is
 * never a vowel here. `'Ada Lovelace'` → `6`, `'rhythm'` → `0`.
 */
export const countVowels = (text: string): number => text.match(/[aeiou]/gi)?.length ?? 0
