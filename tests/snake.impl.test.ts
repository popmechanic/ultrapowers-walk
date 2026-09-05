import { expect, test } from 'bun:test'
import { snakeCase } from '../src/snake'

test('an upper-case letter starts a new word and the result is lower-case', () => {
  expect(snakeCase('helloWorld')).toBe('hello_world')
  expect(snakeCase('HelloWorldAgain')).toBe('hello_world_again')
})

test('a hyphen or a run of whitespace is a word boundary too', () => {
  expect(snakeCase('kebab-case-in')).toBe('kebab_case_in')
  expect(snakeCase('two words')).toBe('two_words')
  expect(snakeCase('already_snake')).toBe('already_snake')
})

test('doubled and edge separators never leak into the result', () => {
  expect(snakeCase('  two   words  ')).toBe('two_words')
  expect(snakeCase('--kebab--case--')).toBe('kebab_case')
})

test('a digit before an upper-case letter is a boundary', () => {
  expect(snakeCase('version2Beta')).toBe('version2_beta')
})

test('the empty string and a single word come back as themselves', () => {
  expect(snakeCase('')).toBe('')
  expect(snakeCase('solo')).toBe('solo')
})
