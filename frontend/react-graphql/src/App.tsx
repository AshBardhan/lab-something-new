import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LocalServer from './pages/LocalServer';
import RemoteServer from './pages/RemoteServer';
import Header from './components/Header';

export default function App() {
	return (
		<Router>
			<div className='app'>
				<Header/>
				<div className='app-content'>
					<Routes>
						<Route path ="/" element={<LocalServer/>}></Route>
						<Route path="/local" element={<LocalServer/>} ></Route>
						<Route path="/remote" element={<RemoteServer/>} ></Route>
					</Routes>
				</div>
			</div>			
		</Router>
	);
}
