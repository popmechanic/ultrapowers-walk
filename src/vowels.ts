// Count the vowels in a string.

/**
 * Count the characters that are one of `a`, `e`, `i`, `o`, `u`, in either case.
 * `y` is not a vowel here, so `'banana'` → `3` and `'rhythm'` → `0`. A string
 * with no vowels — including the empty string — → `0`.
 */
export const countVowels = (text: string): number => (text.match(/[aeiou]/gi) ?? []).length
