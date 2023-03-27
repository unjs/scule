# 🧵 Scule

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]
[![bundle][bundle-src]][bundle-href]

<!-- ![](.github/banner.svg) -->

## Install

Install using npm or yarn:

```bash
npm i scule
# or
yarn add scule
```

Import:

```js
// CommonJS
const { pascalCase } = require("scule");

// ESM
import { pascalCase } from "scule";
```

**Notice:** You may need to transpile package for legacy environments

## Utils

<!-- MKDOCS_START-->

### `camelCase`

Splits string and joins by camelCase convention (`foo-bar` => `fooBar`)

```ts
import { camelCase } from "scule"

camelCase (input)
```

### `isUppercase`

If the character is a number, return undefined, otherwise return whether the character is uppercase.

```ts
import { isUppercase } from "scule"

isUppercase (input)
```

### `kebabCase`

Splits string and joins by kebab-case convention (`fooBar` => `foo-bar`)

```ts
import { kebabCase } from "scule"

kebabCase (input, joiner)
```

### `lowerFirst`

Converts first character to lower case

```ts
import { lowerFirst } from "scule"

lowerFirst (input)
```

### `pascalCase`

Splits string and joins by PascalCase convention (`foo-bar` => `FooBar`)

```ts
import { pascalCase } from "scule"

pascalCase (input)
```

### `snakeCase`

Splits string and joins by snake_case convention (`foo-bar` => `foo_bar`)

```ts
import { snakeCase } from "scule"

snakeCase (input)
```

### `splitByCase`

A function that takes a string and returns an array of strings.


- Splits string by the splitters provided (default: ['-', '_', '/', '.'])
- Splits when case changes from lower to upper or upper to lower
- Ignores numbers for case changes
- Case is preserved in returned value
- Is an irreversible function since splitters are omitted

```ts
import { splitByCase } from "scule"

splitByCase (input, separators)
```

### `upperFirst`

Converts first character to upper case

```ts
import { upperFirst } from "scule"

upperFirst (input)
```
<!-- MKDOCS_END -->

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using corepack enable
- Install dependencies using pnpm install
- Run interactive tests using pnpm dev

## License

[MIT](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/scule?style=flat-square
[npm-version-href]: https://npmjs.com/package/scule
[npm-downloads-src]: https://img.shields.io/npm/dm/scule?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/scule
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/scule/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/scule/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/scule/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/scule
[bundle-src]: https://img.shields.io/bundlephobia/minzip/scule?style=flat-square
[bundle-href]: https://bundlephobia.com/result?p=scule
