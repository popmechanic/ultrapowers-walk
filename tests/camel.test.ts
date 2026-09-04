import { expect, test } from 'bun:test'
import { camelCase } from '../src/camel'

test('upper-cases every segment after the first', () => {
  expect(camelCase('foo-bar-baz')).toBe('fooBarBaz')
})

test('leading, trailing and doubled hyphens vanish', () => {
  expect(camelCase('--foo--bar-')).toBe('fooBar')
})

test('a single segment comes back unchanged', () => {
  expect(camelCase('foo')).toBe('foo')
})

test('the empty string stays empty', () => {
  expect(camelCase('')).toBe('')
})
