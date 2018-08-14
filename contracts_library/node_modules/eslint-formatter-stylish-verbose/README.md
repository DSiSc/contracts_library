# eslint-formatter-stylish-verbose
[![Build Status](https://travis-ci.org/jacquesd/eslint-formatter-stylish-verbose.svg?branch=master)](https://travis-ci.org/jacquesd/eslint-formatter-stylish-verbose)
[![Codecov](https://img.shields.io/codecov/c/github/jacquesd/eslint-formatter-stylish-verbose.svg)](https://codecov.io/gh/jacquesd/eslint-formatter-stylish-verbose)
[![License](https://img.shields.io/github/license/jacquesd/eslint-formatter-stylish-verbose.svg)](https://github.com/jacquesd/eslint-formatter-stylish-verbose/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/eslint-formatter-stylish-verbose.svg)](https://www.npmjs.com/package/eslint-formatter-stylish-verbose)

> Modified version of the [stylish reporter](https://github.com/eslint/eslint/blob/master/tests/lib/formatters/stylish.js) for [ESLint](https://eslint.org) which logs files without warning/errors.

![](screenshot.png)

## Install

```
$ npm install --save-dev eslint-formatter-stylish-verbose
```

## Usage

### ESLint CLI

```
$ eslint --format=stylish-verbose file.js
```

### [grunt-eslint](https://github.com/sindresorhus/grunt-eslint)

```js
grunt.initConfig({
	eslint: {
		target: ['file.js'].
		options: {
			format: 'stylish-verbose'
		}
	}
});

grunt.loadNpmTasks('grunt-eslint');
grunt.registerTask('default', ['eslint']);
```

### [gulp-eslint](https://github.com/adametry/gulp-eslint)

```js
const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () =>
	gulp.src('file.js')
		.pipe(eslint())
		.pipe(eslint.format('stylish-verbose'))
);
```

### [eslint-loader](https://github.com/MoOx/eslint-loader) *(webpack)*

```js
module.exports = {
	entry: ['file.js'],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-formatter-stylish-verbose')
				}
			}
		]
	}
};
```

## License

MIT © [Jacques Dafflon](https://sindresorhus.com)

## Credits

Credits for the [original implementation of the stylish reporter](https://github.com/eslint/eslint/blob/master/tests/lib/formatters/stylish.js) go to Sindre Sorhus, @[sindresorhus](https://github.com/sindresorhus).

This README is adapted from the [original README](https://github.com/sindresorhus/eslint-stylish/blob/master/readme.md) of---the now [deprecated version](https://github.com/sindresorhus/eslint-stylish) of---the stylish reporter.
