// Reduce a name to its initials.

/**
 * Take the first character of every whitespace-separated word, upper-case it,
 * and join with nothing, so `'Ada Lovelace'` → `'AL'`. Matching maximal runs of
 * non-whitespace ignores surrounding and repeated whitespace and avoids the
 * empty-string artefact of splitting `''`, so `''` → `''`.
 */
export const initials = (text: string): string =>
  (text.match(/\S+/g) ?? []).map((word) => word.charAt(0).toUpperCase()).join('')
