const fs = require('fs');
const { h } = require('preact');
const render = require('preact-render-to-string');
const bundle = require('./build/ssr-build/ssr-bundle');
const template = fs.readFileSync('build/index.html', 'utf8');
const NotFound = require('./src/routes/notFound');

const App = bundle.default;
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;

const homeRoute = (req, res) => {
	let body = render(h(App, { url: req.url }));
	console.log(App.default);
	res.setHeader('Content-Type', 'text/html');
	res.end(template.replace(RGX, body));
};

const errorRoute = (req, res) => {
  let body = render(h(NotFound));
	res.setHeader('Content-Type', 'text/html');
	res.end(template.replace(RGX, body));
};

module.exports = {
  homeRoute,
  errorRoute
}
