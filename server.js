const express = require('express');
const path = require('path');
const compression = require('compression')();
const routes = require('./server-routes');
const { PORT = 3000 } = process.env;

function setHeaders(res, file) {
	let cache = path.basename(file) === 'sw.js' ? 'private,no-cache' : 'public,max-age=31536000,immutable';
	res.setHeader('Cache-Control', cache); // to not cache service worker file
}

const appServer = express();
appServer.use(compression);
appServer.use(express.static('build', { setHeaders }));

const {homeRoute, errorRoute} = routes;
appServer.get('/', homeRoute);
appServer.get('*', errorRoute);

appServer.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Running on: http://localhost:${PORT}`);
});
