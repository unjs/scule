const NUMBER_CHAR_RE = /[0-9]/

export function isUppercase (char: string = ''): boolean | null {
  if (NUMBER_CHAR_RE.test(char)) {
    return null
  }
  return char.toUpperCase() === char
}

const STR_SPLITTERS = ['-', '_', '/', '.']

export function splitByCase (str: string, splitters = STR_SPLITTERS): string[] {
  const parts: string[] = []

  if (!str || typeof str !== 'string') {
    return parts
  }

  let buff: string = ''

  let previousUpper = null
  let previousSplitter = null

  for (const char of str.split('')) {
    // Splitter
    const isSplitter = splitters.includes(char)
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

  return parts
}

export function upperFirst (str: string): string {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substring(1)
}

export function lowerFirst (str: string): string {
  if (!str) {
    return ''
  }
  return str[0].toLowerCase() + str.substring(1)
}

export function pascalCase (str: string | string[] = ''): string {
  return (Array.isArray(str) ? str : splitByCase(str))
    .map(p => upperFirst(p))
    .join('')
}

export function camelCase (str: string | string[] = ''): string {
  return lowerFirst(pascalCase(str))
}

export function kebabCase (str: string | string[] = '', joiner = '-'): string {
  return (Array.isArray(str) ? str : splitByCase(str))
    .map((p = '') => p.toLowerCase())
    .join(joiner)
}

export function snakeCase (str: string | string[] = '') {
  return kebabCase(str, '_')
}
