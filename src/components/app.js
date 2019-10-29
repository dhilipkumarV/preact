import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import NotFound from '../routes/notFound';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */


	render(props) {
		return (
			<div id="app">
				<Header />
				<Router url={props.url} >
					<Home path="/" />
					<NotFound path="/*" />
				</Router>
			</div>
		);
	}
}
