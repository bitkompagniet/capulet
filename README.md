With capulet, you parse a configuration object from an array of required fields
followed by any number of object sources.

If any key is missing after merging the object sources, capulet will throw. If
you want a key to be optional, you should supply a default value object somewhere
in the chain (that value can be undefined or null).

The new config object is populated by merging in objects left to right (like
`Object.assign` or `_.merge`). Any defaults should be added first, and then the user
configuration source.

```javascript

const capulet = require('capulet');

const config = capulet([
	'db',
	'templateDirectory',
], {
	'db': 'mongodb://localhost:27017/mydb',
}, process.env);

const db = config.get('db');

```

The config exposes a middleware function for use with connect/express, that exposes 
the `get` method as `config` on the request object.

```javascript
const express = require('express');
const app = express();

app.use(config.middleware());

app.use(function (req, res) {
	const db = req.config('db');
	const entireConfig = req.config();
});
```