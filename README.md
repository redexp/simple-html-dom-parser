simple-html-dom-parser
======================

[![Build Status](https://travis-ci.org/redexp/simple-html-dom-parser.svg?branch=master)](https://travis-ci.org/redexp/simple-html-dom-parser)

## Install
`npm install simple-html-dom-parser`

## API

```javascript
/**
 * @param {String} html
 * @param {Object} options
 * @returns {DomObject}
 */
parse(html, options)
```
`options` - Optional object of options:
```javascript
{
  regex: {
    name: /[a-zA-Z_][\w:\-\.]*/, //Regex for element name
    attribute: /[a-zA-Z_][\w:\-\.]*/ //Regex for attribute name
  }
}
```
`{DomObject}` - object with next structure
```javascript
{
  type: 'document',
  children: []
}
```
`children:` is array of objects of next types
```javascript
{
  type: 'doctype' || 'comment' || 'text',
  parent: {DomObject},
  prev: {DomObject} || null,
  next: {DomObject} || null,
  data: {String}
}

{
  type: 'tag',
  name: {String},
  attr: {
    id: 'example'
  },
  unary: false, // shows is tag self-closing or not
  parent: {DomObject},
  prev: {DomObject} || null,
  next: {DomObject} || null,
  children: []
}
```

```javascript
/**
 * @param {DomObject} dom
 * @returns {String}
 */
getOuterHTML(dom)
```
```javascript
/**
 * @param {DomObject} dom
 * @returns {String}
 */
getInnerHTML(dom)
```
