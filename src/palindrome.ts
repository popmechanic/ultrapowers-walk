// Decide whether text reads the same forwards and backwards.

/**
 * Return `true` when `text` reads the same in both directions once every
 * character other than an ASCII letter or digit is dropped and case is folded
 * away. `isPalindrome('A man, a plan, a canal: Panama')` → `true`,
 * `isPalindrome('race a car')` → `false`. The empty string normalises to the
 * empty string, which is a palindrome.
 */
export const isPalindrome = (text: string): boolean => {
  const normalised = text.toLowerCase().replace(/[^a-z0-9]/g, '')
  return normalised === [...normalised].reverse().join('')
}
