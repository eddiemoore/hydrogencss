# hydrogen.css
Atomic CSS for CSS Modules

[![npm](https://img.shields.io/npm/v/hydrogencss.svg)](http://npm.im/hydrogencss)

## Installation

#### NPM
```shell
npm i -S hydrogencss
```

#### Yarn
```shell
yarn add hydrogencss
```

## Usage with CSS Modules
There are two ways to compose with each value. The first:

```css
.container {
  composes: <value> from 'hydrogencss/<property>.css';
}
```
With this way you will be importing all the classes within `<property>.css`, unless
you are clearing up the unused CSS.

The alternate way to import is
```css
.container {
  composes: <value> from 'hydrogencss/<property>/<value>.css';
}
```

Example:
```css
.container {
  composes: flex from 'hydrogencss/display/flex.css';
}
```

Which will just include:
```css
.flex { display: flex; }
```

To see all the properties and values available please check the [docs](docs/) folder.
