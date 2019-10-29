const { h } = require('preact');
const render = require('preact-render-to-string');
const { ScriptMapper } = require('./scriptMapper');
const App = require('../src/components/app'); 

const mapper = new ScriptMapper();


const homeRoute = (req, res) => {
	let body = render(<App.default />);
	res.setHeader('Content-Type', 'text/html');
	const builtFileHTML = mapper.constructScript('home');
	res.send(
		`<html>
			<body>
				${body}
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
