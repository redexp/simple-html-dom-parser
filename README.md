# simple-html-dom-parser

## Install
`npm install simple-html-dom-parser`

## Test
`npm test`

## API

### `parse(html, options)`
* `html` - String of input html
* `options` - Optional object of options:
```javascript
{
  regex: {
    name: /[a-zA-Z_][\w:\-\.]*/, //Regex for element name
    attribute: /[a-zA-Z_][\w:\-\.]*/ //Regex for attribute name
  }
}
```

Returns object with next structure
```javascript
{
  type: 'document',
  children: []
}
```
`children` are objects of one of next types
```javascript
{
  type: 'doctype' || 'tag' || 'comment' || 'text'
  parent: object,
  prev: object,
  next: object,
  children: [],
  // type specific props
  data: 'text', // value of doctype, comment or text
  // tag props
  name: 'div',
  attr: {
    id: 'example'
  },
  unary: false // shows is tag self-closing or not
}
```

### `getOuterHTML(object)`
Returns outer html string of dom object

### `getInnerHTML(object)`
Returns inner html string of dom object
