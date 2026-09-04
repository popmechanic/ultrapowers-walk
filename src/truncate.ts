// Cut text down to a maximum length, marking the cut with an ellipsis.

/**
 * Return `text` unchanged when it fits in `max` characters, otherwise the
 * first `max - 1` characters followed by one `…` (U+2026) — the result of a
 * cut is exactly `max` long. `truncate('hello wonderful world', 10)` →
 * `'hello won…'`. Throws when `max` is not an integer of at least 1.
 */
export const truncate = (text: string, max: number): string => {
  if (!Number.isInteger(max) || max < 1) {
    throw new Error(`truncate: max must be an integer >= 1, got ${String(max)}`)
  }
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`
}
