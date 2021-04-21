/* eslint-disable no-console */

import { performance } from 'perf_hooks'
import { kebabCase, splitByCase } from '../src'

function originalKebabCase (str = '', joiner = '-') {
  return (Array.isArray(str) ? str : splitByCase(str))
    .map((p = '') => p.toLocaleLowerCase())
    .join(joiner)
}

if (process.argv.includes('original')) {
  const s = performance.now()
  for (let i = 0; i < 10 ** 4; i++) {
    originalKebabCase('fooBarFooBarFooBarFooBar')
  }
  const e = performance.now()
  console.log('original', e - s)
}

if (process.argv.includes('modified')) {
  const s = performance.now()
  for (let i = 0; i < 10 ** 4; i++) {
    kebabCase('fooBarFooBarFooBarFooBar')
  }
  const e = performance.now()
  console.log('modified', e - s)
}
