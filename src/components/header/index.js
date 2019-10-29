import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Header extends Component {
	render() {
		return (
			<header>
				<h1>Preact App</h1>
				<nav>
					<Link href="/" className="marginL10">Home</Link>
					<Link href="/profile" className="marginL10">Me</Link>
					<Link href="/profile/john" className="marginL10">Dhilip</Link>
				</nav>
			</header>
		);
	}
}
