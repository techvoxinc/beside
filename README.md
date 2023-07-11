# Beside [![Build Status](https://travis-ci.org/forsigner/beside.svg?branch=master)](https://travis-ci.org/forsigner/beside) [![NPM Version](http://img.shields.io/npm/v/beside.svg?style=flat)](https://www.npmjs.org/package/beside)

An UI library to make an element beside another.

### Demo

[demo](http://forsigner.com/beside/)

### Installation

#### bower

```bash
$ bower install beside --save
```

#### npm

```bash
$ npm install beside --save
```

### Usage

```html
<script src="bower_components/beside/dist/js/beside.js"></script>

<div id="me">ME</div>
<div id="you">YOU</div>
```


```js
beside.init({
  me: document.getElementById('me'),
  you: document.getElementById('you'),
  where: 'top center'
});
```

### Options `where`

- top center
- top left
- top right
- top left diagonal
- top right diagonal
- bottom center
- bottom left
- bottom right
- bottom left diagonal
- bottom right diagonal
- left center
- left top
- left bottom
- right center
- right top
- right bottom
- top left inner
- top center inner
- top right inner
- left center inner
- left center inner
- center center inner
- right center inner
- bottom left inner
- bottom center inner
- bottom right inner

### UI component base on Beside

* [fo-popover](https://github.com/forsigner/fo-popover) A nice popover for Angular.
* [fo-tooltop](https://github.com/forsigner/fo-tooltip) A nice tooltip for Angular.

### Browser compatibility

- IE7 && IE7+
- Firefox
- Chrome
- Safari
- Opera


### License

  [MIT](LICENSE)
