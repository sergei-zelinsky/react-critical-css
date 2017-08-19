# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2017-08-19

### Changed
- `withStyles` - throws an error when styles are not passed or when value's type is not string
- `StyleRegistry.prototype.registerStyles` - throws an error when styles are not passed or when value's type is not string
- `StyleRegistry.prototype.getCriticalCSS` - returns string joined with `''` (empty string) instead of `'\n'` (metacharacter of new line)

## [1.0.0] - 2017-08-17

### Added
- CriticalCSSProvider
- withStyles
- StyleRegistry
