const fs = require('fs');
const { h } = require('preact');
const render = require('preact-render-to-string');
const bundle = require('./build/ssr-build/ssr-bundle');
// const template = fs.readFileSync('build/index.html', 'utf8');
// const NotFound = require('./src/routes/notFound');
const App = bundle.default;
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;

const ASSETS_JSON_PATH = 'assets.json';

function ScriptMapper() {
	this.assets = {};
	const hasAssetFile = fs.existsSync(ASSETS_JSON_PATH);
	if (hasAssetFile) {
		this.assets = JSON.parse(fs.readFileSync(ASSETS_JSON_PATH));
	}
}

ScriptMapper.prototype.createTag = function(tag, url, rel) {
	const tagCreator = {
		script:`<script type="text/javascript" charset="utf-8" src="${url}"></script>`,
		link:`<link rel="${rel || 'stylesheet'}" charset="utf-8" href="${url}"></link>`
	};
	return tagCreator[tag];
}

ScriptMapper.prototype.constructScript = function(route) {
	const {bundle} = this.assets;
	const scriptConstructor = {
		'home': () => {
			return this.createTag('link', bundle.css, 'stylesheet') + this.createTag('script', bundle.js)  + this.createTag('script', this.assets['route-home'].js);
		},
		'notFound': () => {
			return this.createTag('link', bundle.css, 'stylesheet') + this.createTag('script', bundle.js)  + this.createTag('script', this.assets['route-notFound'].js);
		}
	}
	return scriptConstructor[route]();
}

const mapper = new ScriptMapper();


const homeRoute = (req, res) => {
	let body = render(h(App, { url: req.url }));
	res.setHeader('Content-Type', 'text/html');
	const builtFileHTML = mapper.constructScript('home');
	res.send(
		`<html>
			<body>
				${builtFileHTML}
			</body>
		</html>`);
};

const errorRoute = (req, res) => {
	res.setHeader('Content-Type', 'text/html');
};

module.exports = {
  homeRoute,
  errorRoute
}
