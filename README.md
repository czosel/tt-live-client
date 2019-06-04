# tt-live-client

Unofficial JS client for tischtennislive.de.

## Installation

The package is hosted on npm, and contains a build for browsers.

```html
<script src="/dist/bundle.js"></script>
<script src="https://unpkg.com/tt-live-client/dist/bundle.js"></script>
```

Afterwards, you can access the module under the global name `TTlive`.

## API

### leagueTable(url, selector)

Renders a league's table ("Ergebnistabelle") to a given DOM node.

```js
// Example
TTlive.leagueTable(url, selector);
```


