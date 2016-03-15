# Simple html to dom parser

## API

### `parse(html)`
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
