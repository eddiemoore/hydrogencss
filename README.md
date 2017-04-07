# hydrogen.css
Atomic CSS for CSS Modules

[![npm](https://img.shields.io/npm/v/hydrogencss.svg)](http://npm.im/hydrogencss)

```shell
npm i -S hydrogencss
```
or
```shell
yarn add hydrogencss
```

## Usage with CSS Modules
```css
.container {
  composes: flex from 'hydrogencss/display.css';
}
```

If you really want to keep your css tiny you can import just the single property like this:
```css
.container {
  composes: flex from 'hydrogencss/display/flex.css';
}
```
