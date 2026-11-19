import './Header.css';
import {Link, useLocation} from 'react-router-dom';

export default function Header() {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/local">Local</Link>
					</li>
					<li>
						<Link to="/remote">Remote</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}