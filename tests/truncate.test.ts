import { expect, test } from 'bun:test'
import { truncate } from '../src/truncate'

test('text no longer than max comes back unchanged', () => {
  expect(truncate('short', 10)).toBe('short')
  expect(truncate('exactlyten', 10)).toBe('exactlyten')
})

test('a cut is max-1 characters plus one ellipsis, exactly max long', () => {
  expect(truncate('hello wonderful world', 10)).toBe('hello won…')
  expect(truncate('hello wonderful world', 10).length).toBe(10)
})

test('a max of 1 leaves just the ellipsis', () => {
  expect(truncate('ab', 1)).toBe('…')
})

test('a max of 0 throws an Error naming 0', () => {
  expect(() => truncate('anything', 0)).toThrow(Error)
  expect(() => truncate('anything', 0)).toThrow('0')
})

test('a max of -1 throws an Error naming -1', () => {
  expect(() => truncate('anything', -1)).toThrow(Error)
  expect(() => truncate('anything', -1)).toThrow('-1')
})
