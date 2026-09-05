# ultrapowers-walk

A tiny string-utilities library in Bun + TypeScript. `bun test` runs the suite.

| Function | Module | Does |
| --- | --- | --- |
| `slugify` | `src/slug.ts` | title → URL slug |
| `camelCase` | `src/camel.ts` | kebab-case → camelCase |
| `titleCase` | `src/title.ts` | first letter of every word up, rest down |
| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |
| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |
| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |
| `wordCount` | `src/count.ts` | count whitespace-separated words |
| `snakeCase` | `src/snake.ts` | mixed-case, kebab or spaced text → snake_case |
| `initials` | `src/initials.ts` | first letter of every word, upper-cased and joined |
| `isAnagram` | `src/anagram.ts` | same letters the same number of times, ignoring case and punctuation |
