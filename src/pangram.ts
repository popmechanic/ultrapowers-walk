// Decide whether text uses every letter of the alphabet at least once.

const ALPHABET_SIZE = 26

/**
 * Return `true` when `text` contains all 26 ASCII letters `a`–`z` at least
 * once, ignoring case and every character that is not a letter.
 * `isPangram('The quick brown fox jumps over the lazy dog')` → `true`,
 * `isPangram('The quick brown fox jumps over the lazy cat')` → `false`.
 * Digits never stand in for letters, so `isPangram('')` → `false`.
 */
export const isPangram = (text: string): boolean =>
  new Set(text.toLowerCase().replace(/[^a-z]/g, '')).size === ALPHABET_SIZE
