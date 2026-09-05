// Decide whether two strings are anagrams of each other.

/** Fold a string to its sorted `a`–`z` letters, dropping case and everything else. */
const letters = (text: string): string =>
  [...text.toLowerCase().replace(/[^a-z]/g, '')].sort().join('')

/**
 * Return `true` when `a` and `b` use exactly the same letters the same number
 * of times once case and non-letters are ignored.
 * `isAnagram('listen', 'silent')` → `true`,
 * `isAnagram('Dormitory', 'dirty room!')` → `true`, and
 * `isAnagram('aab', 'abb')` → `false` because counts matter, not the set of
 * letters. Two strings that normalise to nothing — `''` and `''` — are
 * anagrams.
 */
export const isAnagram = (a: string, b: string): boolean => letters(a) === letters(b)
