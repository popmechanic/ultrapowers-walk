// Count the vowels in a string.

/**
 * Count the characters that are one of `a`, `e`, `i`, `o`, `u`, in either
 * case — `y` is not a vowel here. So `'banana'` → `3`, `'AEIOU'` → `5`, and a
 * string with no vowel at all → `0`.
 */
export const countVowels = (text: string): number => (text.match(/[aeiou]/gi) ?? []).length
