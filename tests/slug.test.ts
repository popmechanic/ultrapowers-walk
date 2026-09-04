import { expect, test } from 'bun:test'
import { slugify } from '../src/slug'

test('lower-cases and hyphenates', () => {
  expect(slugify('Hello,  World!')).toBe('hello-world')
})

test('trims hyphens from both ends', () => {
  expect(slugify('--Already--')).toBe('already')
})

test('the empty string stays empty', () => {
  expect(slugify('')).toBe('')
})
