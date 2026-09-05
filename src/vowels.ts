// Count the vowels in a string.

/**
 * Count the letters `a`, `e`, `i`, `o`, `u` with multiplicity, ignoring case.
 * `y` is never a vowel here, so `'Ada Lovelace'` → `4` and `'rhythm'` → `0`.
 */
export const countVowels = (text: string): number => (text.match(/[aeiou]/gi) ?? []).length
