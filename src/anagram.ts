// Decide whether two strings are built from the same letters.

const letters = (text: string): string =>
  [...text.toLowerCase().replace(/[^a-z]/g, '')].sort().join('')

/**
 * Return `true` when `a` and `b` use exactly the same letters the same number
 * of times once case is folded away and every character other than an ASCII
 * letter is dropped. `isAnagram('listen', 'silent')` → `true`,
 * `isAnagram('Dormitory', 'dirty room!')` → `true`, `isAnagram('aab', 'abb')`
 * → `false`. Both empty strings normalise to the empty string, which is an
 * anagram of itself.
 */
export const isAnagram = (a: string, b: string): boolean => letters(a) === letters(b)
