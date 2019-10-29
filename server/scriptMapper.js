const fs = require('fs');

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

module.exports = {
  ScriptMapper
}