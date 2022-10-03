import { CamelCase, JoinByCase, PascalCase, SplitByCase } from './types'

const NUMBER_CHAR_RE = /[0-9]/

export function isUppercase (char: string = ''): boolean | null {
  if (NUMBER_CHAR_RE.test(char)) {
    return null
  }
  return char.toUpperCase() === char
}

const STR_SPLITTERS = ['-', '_', '/', '.'] as const

/* eslint-disable no-redeclare */
export function splitByCase <T extends string> (str: T): SplitByCase<T>
export function splitByCase <T extends string, Sep extends readonly string[]> (str: T, separators: Sep): SplitByCase<T, Sep[number]>
export function splitByCase <T extends string, Sep extends readonly string[]> (str: T, separators?: Sep) {
  const splitters = separators ?? STR_SPLITTERS
  const parts: string[] = []

  if (!str || typeof str !== 'string') {
    return parts as SplitByCase<T, Sep[number]>
  }

  let buff: string = ''

  let previousUpper: boolean | null = null
  let previousSplitter: boolean | null = null

  for (const char of str.split('')) {
    // Splitter
    const isSplitter = (splitters as unknown as string).includes(char)
    if (isSplitter === true) {
      parts.push(buff)
      buff = ''
      previousUpper = null
      continue
    }

    const isUpper = isUppercase(char)
    if (previousSplitter === false) {
      // Case rising edge
      if (previousUpper === false && isUpper === true) {
        parts.push(buff)
        buff = char
        previousUpper = isUpper
        continue
      }
      // Case falling edge
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1]
        parts.push(buff.substring(0, buff.length - 1))
        buff = lastChar + char
        previousUpper = isUpper
        continue
      }
    }

    // Normal char
    buff += char
    previousUpper = isUpper
    previousSplitter = isSplitter
  }

  parts.push(buff)

  return parts as SplitByCase<T, Sep[number]>
}
/* eslint-enable no-redeclare */

export function upperFirst <S extends string> (str: S): Capitalize<S> {
  return (!str ? '' : str[0].toUpperCase() + str.substring(1)) as Capitalize<S>
}

export function lowerFirst <S extends string> (str: S): Uncapitalize<S> {
  return (!str ? '' : str[0].toLowerCase() + str.substring(1)) as Uncapitalize<S>
}

/* eslint-disable no-redeclare */
export function pascalCase (): ''
export function pascalCase <T extends string | readonly string[]> (str: T): PascalCase<T>
export function pascalCase <T extends string | readonly string[]> (str?: T) {
  return !str
    ? ''
    : (Array.isArray(str) ? str : splitByCase(str as string))
      .map(p => upperFirst(p))
      .join('') as PascalCase<T>
}
/* eslint-enable no-redeclare */

/* eslint-disable no-redeclare */
export function camelCase (): ''
export function camelCase <T extends string | readonly string[]> (str: T): CamelCase<T>
export function camelCase <T extends string | readonly string[]> (str?: T) {
  return lowerFirst(pascalCase(str)) as CamelCase<T>
}
/* eslint-enable no-redeclare */

/* eslint-disable no-redeclare */
export function kebabCase (): ''
export function kebabCase <T extends string | readonly string[]> (str: T): JoinByCase<T, '-'>
export function kebabCase <T extends string | readonly string[], Joiner extends string> (str: T, joiner: Joiner): JoinByCase<T, Joiner>
export function kebabCase <T extends string | readonly string[], Joiner extends string> (str?: T, joiner?: Joiner) {
  return !str
    ? ''
    : (Array.isArray(str) ? str : splitByCase(str as string))
      .map(p => p.toLowerCase())
      .join(joiner ?? '-') as JoinByCase<T, Joiner>
}
/* eslint-enable no-redeclare */

/* eslint-disable no-redeclare */
export function snakeCase (): ''
export function snakeCase <T extends string | readonly string[]> (str: T): JoinByCase<T, '_'>
export function snakeCase <T extends string | readonly string[]> (str?: T) {
  return kebabCase(str, '_') as JoinByCase<T, '_'>
}
/* eslint-enable no-redeclare */
