export function isUppercase (char: string = '') {
  return char.toUpperCase() === char
}

const STR_SPLITTERS = ['-', '_', '/']

export function splitByCase (str: string, splitters = STR_SPLITTERS): string[] {
  const parts: string[] = []

  let buff = ''

  let previusUpper = isUppercase(str[0])
  let previousSplitter = splitters.includes(str[0])

  for (const char of str.split('')) {
    const isSplitter = splitters.includes(char)
    if (isSplitter) {
      parts.push(buff)
      buff = ''
      previusUpper = false
      previousSplitter = true
    } else if (!previousSplitter && !previusUpper && isUppercase(char)) {
      parts.push(buff)
      buff = char
      previusUpper = true
      previousSplitter = false
    } else {
      buff += char
      previusUpper = isUppercase(char)
      previousSplitter = isSplitter
    }
  }

  if (buff) {
    parts.push(buff)
  }

  return parts
}

export function upperFirst (str: string): string {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
}

export function lowerFirst (str: string): string {
  if (!str) {
    return ''
  }
  return str[0].toLocaleLowerCase() + str.substr(1)
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
    .map((p = '') => p.toLocaleLowerCase())
    .join(joiner)
}

export function snakeCase (str: string | string[] = '') {
  return kebabCase(str, '_')
}
