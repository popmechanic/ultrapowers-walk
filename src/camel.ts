// Turn a kebab-case name into camelCase.

/**
 * Split on `-` and drop the empty segments, so leading, trailing and doubled
 * hyphens vanish. Segment 0 is kept verbatim; every later segment has only its
 * first character upper-cased, the rest untouched — `'foo-BAR'` → `'fooBAR'`.
 */
export const camelCase = (kebab: string): string =>
  kebab
    .split('-')
    .filter((segment) => segment.length > 0)
    .map((segment, index) =>
      index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join('')
