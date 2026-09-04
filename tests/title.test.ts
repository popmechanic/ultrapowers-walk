import { expect, test } from 'bun:test'
import { titleCase } from '../src/title'

test('upper-cases the first letter of every word and lower-cases the rest', () => {
  expect(titleCase('hello wORLD')).toBe('Hello World')
  expect(titleCase('the QUICK brown')).toBe('The Quick Brown')
})

test('interior whitespace is kept as is', () => {
  expect(titleCase('a  b')).toBe('A  B')
})

test('a tab separator survives unchanged', () => {
  expect(titleCase('foo\tbar')).toBe('Foo\tBar')
})

test('the empty string stays empty', () => {
  expect(titleCase('')).toBe('')
})
