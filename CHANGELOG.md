# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v1.2.0

[compare changes](https://github.com/unjs/scule/compare/v1.1.1...v1.2.0)

### 🚀 Enhancements

- Add `flatCase` and `trainCase` ([#68](https://github.com/unjs/scule/pull/68))

### 🩹 Fixes

- **isUppercase:** Assume characters lowercase by default ([#71](https://github.com/unjs/scule/pull/71))

### 🏡 Chore

- Add `skipLibCheck` ([3b0c760](https://github.com/unjs/scule/commit/3b0c760))
- Update lockfile ([5024603](https://github.com/unjs/scule/commit/5024603))

### ✅ Tests

- Add type tests for #71 ([#71](https://github.com/unjs/scule/issues/71))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Jan-Henrik Damaschke <jdamaschke@outlook.de>

## v1.1.1

[compare changes](https://github.com/unjs/scule/compare/v1.1.0...v1.1.1)

### 🩹 Fixes

- **pascalCase, camelCase:** Move normalize behind a flag ([#63](https://github.com/unjs/scule/pull/63))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.1.0

[compare changes](https://github.com/unjs/scule/compare/v1.0.0...v1.1.0)

### 🚀 Enhancements

- Export type helpers ([#58](https://github.com/unjs/scule/pull/58))

### 🩹 Fixes

- Move types filed to the top ([4fd4a79](https://github.com/unjs/scule/commit/4fd4a79))
- **pascalCase, camelCase:** Lower rest of each segment ([#62](https://github.com/unjs/scule/pull/62))

### 💅 Refactors

- Simplify string variable name ([abb2d2b](https://github.com/unjs/scule/commit/abb2d2b))

### 📖 Documentation

- Add missing quotation mark ([#41](https://github.com/unjs/scule/pull/41))
- Improve readme with code examples ([21f19ba](https://github.com/unjs/scule/commit/21f19ba))

### 🏡 Chore

- Update repo ([#42](https://github.com/unjs/scule/pull/42))
- Update lockfile and typescript ([94bfc58](https://github.com/unjs/scule/commit/94bfc58))
- Update release script ([a52338f](https://github.com/unjs/scule/commit/a52338f))
- Update dependencies ([3a5f1a6](https://github.com/unjs/scule/commit/3a5f1a6))
- Add changelogen dev dependency ([81365b8](https://github.com/unjs/scule/commit/81365b8))

### ✅ Tests

- Convert type tests to vitest syntax ([#61](https://github.com/unjs/scule/pull/61))

### 🎨 Styles

- Lint and format with prettier v3 ([ba39ce6](https://github.com/unjs/scule/commit/ba39ce6))

### 🤖 CI

- Update actions ([1f95350](https://github.com/unjs/scule/commit/1f95350))
- Add autofix ci ([8a7a4b3](https://github.com/unjs/scule/commit/8a7a4b3))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Luke Nelson <luke@nelson.zone>
- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Sébastien Chopin <seb@nuxtlabs.com>
- Nozomu Ikuta 
- XLor <yjl9903@vip.qq.com>

## [1.0.0](https://github.com/unjs/scule/compare/v0.3.2...v1.0.0) (2022-11-14)


### Features

* better type supports ([#20](https://github.com/unjs/scule/issues/20)) ([236fae0](https://github.com/unjs/scule/commit/236fae020482850b165bd93401729b83c1738460))

### [0.3.2](https://github.com/unjs/scule/compare/v0.3.1...v0.3.2) (2022-07-27)


### Bug Fixes

* ignore case changes for numbers ([9927800](https://github.com/unjs/scule/commit/9927800545808dada863aaee3b300d6db22a44b7))

### [0.3.1](https://github.com/unjs/scule/compare/v0.3.0...v0.3.1) (2022-07-27)


### Bug Fixes

* use stable `toLowerCase` ([a0a6c06](https://github.com/unjs/scule/commit/a0a6c0609c23c4def73f63e4cb45eb3fac596904)), closes [#8](https://github.com/unjs/scule/issues/8)

## [0.3.0](https://github.com/unjs/scule/compare/v0.2.1...v0.3.0) (2021-08-17)


### ⚠ BREAKING CHANGES

* handle lower edges (resolves #4)

### Bug Fixes

* handle lower edges (resolves [#4](https://github.com/unjs/scule/issues/4)) ([bb94236](https://github.com/unjs/scule/commit/bb942369b2548b995aefc306a0e0f3fbba923426))

### [0.2.1](https://github.com/unjs/scule/compare/v0.2.0...v0.2.1) (2021-04-28)

## [0.2.0](https://github.com/unjs/scule/compare/v0.1.1...v0.2.0) (2021-04-22)


### ⚠ BREAKING CHANGES

* add `exports` field

### Features

* add `exports` field ([6241d0f](https://github.com/unjs/scule/commit/6241d0f2b4892c5edc820fb2271b6666ef564af0)), closes [#2](https://github.com/unjs/scule/issues/2)

### [0.1.1](https://github.com/unjs/scule/compare/v0.1.0...v0.1.1) (2021-02-16)


### Features

* add dot to default splitters ([db5120f](https://github.com/unjs/scule/commit/db5120fddf22850255f7c0d1283aad7d8c53cf5b))

### 0.0.1 (2021-02-16)
